import { isOn } from '@vue/shared'

export const patchProp = (el: Element, key, preValue, nextValue) => {
  if (key === 'class') {
  } else if (key === 'style') {
  } else if (isOn(key)) {
  } else {
  }
}
