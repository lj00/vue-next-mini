import { EMPTY_OBJ } from '@vue/shared'
import { isReactive } from 'packages/reactivity/src/reactive'

export interface WatchOptions<Immediate = boolean> {
  immediate?: Immediate
  deep?: boolean
}

export function watch(source, cb: Function, options?: WatchOptions) {
  return doWatch(source, cb, options)
}

function doWatch(
  source,
  cb: Function,
  { immediate, deep }: WatchOptions = EMPTY_OBJ
) {
  let getter: () => any

  if (isReactive(source)) {
    getter = () => source
    deep = true
  } else {
    getter = () => {}
  }

  if (cb && deep) {
    const baseGetter = getter
    getter = () => baseGetter()
  }
}
