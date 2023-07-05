import { mutableHandlers } from './baseHandlers'

export const reactiveMap = new WeakMap<Object, any>()

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

  const proxy = new Proxy(target, mutableHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
