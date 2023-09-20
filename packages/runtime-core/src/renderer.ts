import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Comment, Fragment, Text } from './vnode'

export interface RendererOptions {
  /**
   * 为指定的Element的props打补丁
   */
  patchProp(el: Element, key: string, preValue: any, nextValue: any): void
  /**
   * 为指定的Element设置text
   */
  setElementText(node: Element, text: string): void
  /**
   * 插入指定的el到parent中，anchor表示插入的位置，即：锚点
   */
  insert(el, parent: Element, anchor?): void
  /**
   * 创建element
   */
  createElement(type: string)
}

export function createRenderer(options: RendererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RendererOptions): any {
  const processElement = () => {}

  const patch = (oldVnode, newVnode, container, anchor = null) => {
    if (oldVnode === newVnode) {
      return
    }

    const { type, shapeFlag } = newVnode
    switch (type) {
      case Text:
        break
      case Comment:
        break
      case Fragment:
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVnode, newVnode, container, anchor)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
        }
    }
  }

  const render = (vnode, container) => {
    if (vnode == null) {
      // TODO: 卸载
    } else {
      patch(container._vnode || null, vnode, container)
    }
  }

  return {
    render
  }
}
