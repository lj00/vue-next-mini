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

  return {}
}

function parseChildren(context: ParserContext, ancestors) {
  const nodes = []

  return nodes
}

function startsWith(source: string, searchString: string): boolean {
  return source.startsWith(searchString)
}
