<template>
  <slot />
  <div v-if="clientMounted" class="modal-teleport">
    <teleport to="body">
      <transition-group name="modal-fade">
        <ModalContainer
          v-for="(modal, index) in modals"
          :id="modal.id"
          :key="modal.id"
          :closable="modal.config.closable"
          :component="modal.component"
          :index="index"
          :mask-closable="modal.config.maskClosable"
          :min-width="minWidth"
          :params="modal.props"
          :title="modal.config.title"
          :width="modal.config.width"
        />
      </transition-group>
    </teleport>
  </div>
</template>

<style lang="stylus" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active
  transition all 0.5s ease

.modal-fade-enter-from,
.modal-fade-leave-to
  opacity 0
</style>

<script setup lang="ts">
// #region Import
import {
  defineAsyncComponent,
  defineProps,
  onMounted,
  provide,
  ref,
  shallowRef,
  triggerRef,
} from 'vue'
import ModalContainer from './modal-container.vue'
import type { IModal, IModalOption } from './interfaces'

defineProps({
  minWidth: {
    type: Number,
  },
})
// #endregion

// #region Variable
// modal列表
const modals = shallowRef<IModal[]>([])
// 处理SSR错误
const clientMounted = ref<boolean>(false)
// #endregion

// #region Function
/**
 * 打开Modal
 */
async function openModal(option: IModalOption) {
  const component = defineAsyncComponent(() =>
    Promise.resolve(option.component),
  )

  return new Promise((resolve) => {
    modals.value.push({
      id: Math.random().toString(32).slice(2),
      component,
      props: option.props,
      resolve,
      config: option,
    })
    triggerRef(modals)
  })
}

/**
 * 关闭Modal
 */
function closeModal(id: string, data: any) {
  const index = modals.value.findIndex(x => x.id === id)

  if (index < 0) return

  const modal = modals.value[index]
  modal?.resolve(data)
  modals.value.splice(index, 1)

  triggerRef(modals)
}

function closeAllModal() {
  modals.value.forEach((modal) => {
    modal.resolve()
  })

  modals.value = []
  triggerRef(modals)
}
// #endregion

provide('modal', {
  open: openModal,
  close: closeModal,
  closeAll: closeAllModal,
})

onMounted(() => {
  clientMounted.value = true
})
</script>
