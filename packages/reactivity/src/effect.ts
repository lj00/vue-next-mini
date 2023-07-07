
export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
}

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    return this.fn()
  }

}

/**
 * 收集依赖
 * @param target
 * @param key
 */
export function track(target: object, key: unknown) {
  console.log('track: 收集依赖')
}

/**
 * 触发依赖
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('trigger: 触发依赖')
}
