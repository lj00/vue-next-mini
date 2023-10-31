export function patchEvent(
  el: Element & { _vei?: Object },
  rawName: string,
  prevValue,
  nextValue
) {
  const invokers = el._vei || (el._vei = {})
  const existingInvoker = invokers[rawName]
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue
  } else {
    const name = parseName(rawName)
  }
}

function parseName(name: string) {
  return name.slice(2).toLowerCase()
}
