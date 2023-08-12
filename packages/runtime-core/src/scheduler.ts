let isFlushPending = false

const pendingPreFlushCbs: Function[] = []

export function queuePreFlushCb(cb: Function) {
  queueCb(cb)
}

function queueCb(cb: Function, pendingQueue: Function[]) {}
