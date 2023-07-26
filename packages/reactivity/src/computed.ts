import { isFunction } from '@vue/shared'
import { ReactiveEffect } from './effect'
import { Dep } from './dep'
import { trackRefValue } from './ref'

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  public _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true

  constructor(getter) {
    this.effect = new ReactiveEffect(getter)
    this.effect.computed = this
  }

  get value() {
    trackRefValue(this)
  }
}

export function computed(getterOrOptions) {
  let getter

  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
  }

  const cRef = new ComputedRefImpl(getter)
  return cRef
}
