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
  const {
    insert: hostInsert,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    setElementText: hostSetElementText
  } = options

  const processElement = (oldVnode, newVnode, container, anchor) => {
    if (oldVnode == null) {
      mountElement(newVnode, container, anchor)
    } else {
      // TODO: 更新操作
    }
  }

  const mountElement = (vnode, container, anchor) => {
    const { type, props, shapeFlag } = vnode
    // 1. 创建element
    const el = (vnode.el = hostCreateElement(type))
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 2. 设置文本
      hostSetElementText(el, vnode.children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    }
    // 3. 设置props
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    // 4. 插入
    hostInsert(el, container, anchor)
  }

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
