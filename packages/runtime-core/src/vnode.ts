import { isString } from '@vue/shared'
import { ShapeFlags } from 'packages/shared/src/shapeFlags'

export interface VNode {
  __v_isVNode: true
  type: any
  props: any
  children: any
  shapeFlag: number
}

export function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

export function createVNode(type, props, children): VNode {
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0

  return createBaseVNode(type, props, children, shapeFlag) {}
}

function createBaseVNode(type, props, children, shapeFlag) {
  
}
