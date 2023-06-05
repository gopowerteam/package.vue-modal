<template>
  <div class="modal-container">
    <div
      ref="wrapperRef"
      class="modal-wrapper"
      :style="wrapperStyle"
      @click.self="maskClosable && onCloseModal()"
    >
      <div
        ref="contentRef"
        class="modal-content"
        :style="contentStyle"
      >
        <div
          v-if="header && !frameless"
          ref=""
          class="modal-header"
        >
          <div class="title">
            {{ title }}
          </div>
          <div class="action">
            <CloseSVG
              v-if="closable"
              class="close-button"
              @click="onCloseModal"
            />
          </div>
        </div>
        <div
          v-if="component"
          class="modal-body"
        >
          <component
            :is="component"
            v-bind="params"
          />
        </div>
        <div
          v-if="closable && frameless"
          class="frameless-close-button"
        >
          <CloseSVG
            class="close-button"
            @click="onCloseModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  overflow: auto;
}

.modal-content {
  margin: auto;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header .title {
  font-weight: 600;
  font-size: 16px;
}
.close-button {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.frameless-close-button:hover,.close-button:hover {
  fill: rgba(0, 0, 0, 0.5);
}

.frameless-close-button {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100%;
  margin-top: 10px;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineProps, inject, onMounted, ref, shallowRef, triggerRef } from 'vue'

import CloseSVG from './assets/icons/close.svg?component'

const props = defineProps({
  component: {
    type: Object,
    require: true,
  },
  params: {
    type: Object,
    default: () => {},
  },
  width: {
    type: [Number, String],
  },
  minWidth: {
    type: [Number, String],
    required: false,
  },
  title: {
    type: String,
  },
  header: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    required: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  keyboard: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  frameless: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: [Number, String],
    default: 10,
  },
})

const modal = inject('modal') as any

const wrapperRef = shallowRef<any>()
const contentRef = shallowRef<any>()

const contentHeight = ref<number>(0)

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries)
    contentHeight.value = entry.contentRect.height
})

const wrapperStyle = computed(() => {
  const wrapper = wrapperRef.value
  const content = contentRef.value

  const oversize = wrapper && content && wrapper.clientHeight <= contentHeight.value

  return oversize
    ? { padding: '20px 0' }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
})

function onCloseModal() {
  modal.close(props.id)
}

/**
 * 获取容器样式
 */
const contentStyle = computed(() => {
  const getValue = (value: string | number | unknown) =>
    ({
      string: value,
      number: `${value}px`,
    }[typeof value as 'string' | 'number'])

  const styles: { key: keyof CSSProperties; value: string | number | unknown }[] = [
    { key: 'width', value: getValue(props.width) },
    { key: 'minWidth', value: getValue(props.minWidth) },
    { key: 'padding', value: props.frameless ? 0 : getValue(props.padding) },
  ]

  return styles
    .filter(({ value }) => !!value)
    .reduce<CSSProperties>((result, { key, value }) => {
      result[key] = value as any
      return result
    }, {})
})

function onResize() {
  if (window) {
    window.addEventListener('resize', () => {
      triggerRef(wrapperRef)
      triggerRef(contentRef)
    })
  }
}

function onKeyboard() {
  if (props.closable && props.keyboard) {
    const handleEsc = ({ key }: { key: string }) => {
      if (key === 'Escape') {
        modal.close(props.id)
        window.removeEventListener('keydown', handleEsc)
      }
    }

    window.addEventListener('keydown', handleEsc)
  }
}

onMounted(() => {
  onKeyboard()
  onResize()

  resizeObserver.observe(contentRef.value)
})
</script>
