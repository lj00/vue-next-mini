import { Dep } from './dep'

export interface Ref<T = any> {
  value: T
}

export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }

  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T

  public dep?: Dep = undefined

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = 
  }
}

/**
 * 是否为 ref
 */
function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}
