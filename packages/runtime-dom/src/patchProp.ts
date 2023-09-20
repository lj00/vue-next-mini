import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'

export const patchProp = (el: Element, key, preValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
  } else if (isOn(key)) {
  } else {
  }
}
