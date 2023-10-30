import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'

export const patchProp = (el: Element, key, preValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, preValue, nextValue)
  } else if (isOn(key)) {
    patchEvent()
  } else {
  }
}
