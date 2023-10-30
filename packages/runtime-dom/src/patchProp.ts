import { isOn } from '@vue/shared'
import { patchAttr } from './modules/attrs'
import { patchClass } from './modules/class'
<<<<<<< HEAD
import { patchStyle } from './modules/style'
=======
import { patchDOMProp } from './modules/props'
>>>>>>> bd9bd9f73b391eca253240e9a7f4899493241690

export const patchProp = (el: Element, key, preValue, nextValue) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, preValue, nextValue)
  } else if (isOn(key)) {
<<<<<<< HEAD
    patchEvent()
=======
  } else if (shouldSetAsProp(el, key)) {
    patchDOMProp(el, key, nextValue)
>>>>>>> bd9bd9f73b391eca253240e9a7f4899493241690
  } else {
    patchAttr(el, key, nextValue)
  }
}

function shouldSetAsProp(el: Element, key: string) {
  if (key === 'form') {
    return false
  }

  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }

  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }

  return key in el
}
