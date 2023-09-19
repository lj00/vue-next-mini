const doc = document

export const nodeoOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },

  createElement: (tag): Element => {
    const el = doc.createElement(tag)
    return el
  },

  setElementText: (el: Element, text) => {
    el.textContent = text
  }
}
