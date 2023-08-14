import { mutableHandlers } from './baseHandlers'
import { isObject } from '../../shared/src/index'

export const reactiveMap = new WeakMap<Object, any>()

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
  target: Object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Object, any>
) {
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, baseHandlers)
  proxy[ReactiveFlags.IS_REACTIVE] = true
  proxyMap.set(target, proxy)

  return proxy
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value as object) : value

export function isReactive(value): boolean {
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}
