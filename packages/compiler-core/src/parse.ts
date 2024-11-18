import { ElementTypes, NodeTypes } from './ast'

const enum TagType {
  Start,
  End
}

export interface ParserContext {
  source: string
}

function createParserContext(content: string): ParserContext {
  return {
    source: content
  }
}

export function baseParse(content: string) {
  const context = createParserContext(content)

  const children = parseChildren(context, [])

  return createRoot(children)
}

export function createRoot(children) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc: {}
  }
}

function parseChildren(context: ParserContext, ancestors) {
  const nodes = []

  while (!isEnd(context, ancestors)) {
    const s = context.source
    let node
    if (startsWith(s, '{{')) {
      node = parseInterpolation(context)
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors)
      }
    }

    if (!node) {
      node = parseText(context)
    }

    pushNode(nodes, node)
  }

  return nodes
}

function parseInterpolation(context: ParserContext) {
  // {{ xx }}
  const [open, close] = ['{{', '}}']

  advanceBy(context, open.length)

  const closeIndex = context.source.indexOf(close)
  const preTrimContent = parseTextData(context, closeIndex)
  const content = preTrimContent.trim()

  advanceBy(context, close.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      content
    }
  }
}

function pushNode(nodes, node) {
  nodes.push(node)
}

function parseElement(context: ParserContext, ancestors) {
  const element = parseTag(context, TagType.Start)

  ancestors.push(element)
  const children = parseChildren(context, ancestors)
  ancestors.pop()

  element.children = children

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End)
  }

  return element
}

function parseText(context: ParserContext) {
  const endToken = ['<', '{{']

  let endIndex = context.source.length
  for (let i = 0; i < endToken.length; i++) {
    const index = context.source.indexOf(endToken[i], 1)
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  }

  const content = parseTextData(context, endIndex)
  return {
    type: NodeTypes.TEXT,
    content
  }
}

function parseTextData(context: ParserContext, length: number) {
  const rawText = context.source.slice(0, length)

  advanceBy(context, length)
  return rawText
}

function parseTag(context: ParserContext, type: TagType) {
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)!
  const tag = match[1]

  advanceBy(context, match[0].length)

  let isSelfClosing = startsWith(context.source, '/>')
  advanceBy(context, isSelfClosing ? 2 : 1)

  return {
    type: NodeTypes.ELEMENT,
    tag,
    tagType: ElementTypes.ELEMENT,
    children: [],
    props: []
  }
}

function isEnd(context: ParserContext, ancestors) {
  const s = context.source
  if (startsWith(s, '</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
        return true
      }
    }
  }

  return !s
}

function startsWith(source: string, searchString: string): boolean {
  return source.startsWith(searchString)
}

function startsWithEndTagOpen(source: string, tag: string): boolean {
  return (
    startsWith(source, '</') &&
    source.slice(2, 2 + tag.length).toLowerCase() == tag.toLowerCase() &&
    /[\t\r\n\f />]/.test(source[2 + tag.length] || '>')
  )
}

function advanceBy(context: ParserContext, numberOfCharacters: number) {
  const { source } = context
  context.source = source.slice(numberOfCharacters)
}
