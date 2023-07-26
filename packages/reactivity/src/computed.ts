import { isFunction } from '@vue/shared'

export class ComputedRefImpl<T> {
  constructor(getter) {

  }
}

export function computed (getterOrOptions) {
  let getter 

  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
  }

  new ComputedRefImpl(getter)
}