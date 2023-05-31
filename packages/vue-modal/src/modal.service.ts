import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance, inject } from 'vue'
import type { IModalOption } from './interfaces'

function getModalContainer(ctx: ComponentInternalInstance | null) {
  let parent = ctx?.parent

  while (
    parent
    && parent.vnode
    && parent.vnode.el
    && parent.vnode.el.className !== 'modal-container'
  )
    parent = parent.parent

  if (parent?.vnode?.el?.className === 'modal-container') return parent.props
  else return null
}

export function useModal() {
  const modal = inject('modal') as any
  const ctx = getCurrentInstance() as any

  return {
    open: (option: IModalOption): Promise<any> => {
      return modal.open(option)
    },
    close: (data: any): void => {
      const modalContainer = getModalContainer(ctx)
      const id = modalContainer?.id

      if (!id) return

      modal.close(id, data)
    },
    closeAll: (): void => modal.closeAll(),
  }
}
