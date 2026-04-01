'use client'

import React from 'react'

interface RichTextNode {
  type?: string
  tag?: string
  format?: string | number
  text?: string
  children?: RichTextNode[]
  url?: string
  listType?: string
  [key: string]: unknown
}

interface RichTextRendererProps {
  content: {
    root: RichTextNode
    [key: string]: unknown
  }
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content?.root?.children) return null

  return (
    <div className="rich-text-content prose-custom">
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: RichTextNode }) {
  // Text node
  if (node.type === 'text' && node.text !== undefined) {
    let textElement: React.ReactNode = node.text

    if (typeof node.format === 'number') {
      // Lexical format bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
      if (node.format & 1) {
        textElement = <strong className="font-semibold text-white/90">{textElement}</strong>
      }
      if (node.format & 2) {
        textElement = <em>{textElement}</em>
      }
      if (node.format & 4) {
        textElement = <s>{textElement}</s>
      }
      if (node.format & 8) {
        textElement = <u>{textElement}</u>
      }
      if (node.format & 16) {
        textElement = (
          <code className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-1.5 py-0.5 rounded text-sm font-mono">
            {textElement}
          </code>
        )
      }
    }

    return <>{textElement}</>
  }

  // Linebreak
  if (node.type === 'linebreak') {
    return <br />
  }

  const children = node.children?.map((child, index) => <RenderNode key={index} node={child} />)

  // Link
  if (node.type === 'link') {
    return (
      <a
        href={node.url || '#'}
        className="text-[var(--color-accent)] hover:text-[var(--color-accent-h)] underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  // Heading
  if (node.type === 'heading') {
    const tag = (node.tag || 'h2') as string
    const baseClass = 'font-serif text-white tracking-wide'

    switch (tag) {
      case 'h1':
        return <h1 className={`text-3xl md:text-4xl ${baseClass} mt-8 mb-4`}>{children}</h1>
      case 'h3':
        return <h3 className={`text-xl md:text-2xl ${baseClass} mt-6 mb-3`}>{children}</h3>
      case 'h4':
        return <h4 className={`text-lg md:text-xl ${baseClass} mt-5 mb-2`}>{children}</h4>
      case 'h5':
        return <h5 className={`text-base md:text-lg ${baseClass} mt-4 mb-2`}>{children}</h5>
      case 'h6':
        return (
          <h6 className={`text-sm md:text-base ${baseClass} text-white/80 mt-4 mb-2`}>
            {children}
          </h6>
        )
      default:
        return <h2 className={`text-2xl md:text-3xl ${baseClass} mt-7 mb-3`}>{children}</h2>
    }
  }

  // Paragraph
  if (node.type === 'paragraph') {
    // Check if paragraph is empty
    const isEmpty =
      !node.children ||
      node.children.length === 0 ||
      (node.children.length === 1 && node.children[0].type === 'text' && !node.children[0].text)

    if (isEmpty) {
      return <div className="h-4" />
    }

    return (
      <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    )
  }

  // List
  if (node.type === 'list') {
    if (node.listType === 'number') {
      return (
        <ol className="list-decimal list-inside text-white/70 font-sans text-sm md:text-base leading-relaxed space-y-2 mb-4 pl-2">
          {children}
        </ol>
      )
    }
    return (
      <ul className="list-disc list-inside text-white/70 font-sans text-sm md:text-base leading-relaxed space-y-2 mb-4 pl-2">
        {children}
      </ul>
    )
  }

  // List item
  if (node.type === 'listitem') {
    return <li className="text-white/70">{children}</li>
  }

  // Quote
  if (node.type === 'quote') {
    return (
      <blockquote className="border-l-2 border-[var(--color-accent)]/50 pl-4 md:pl-6 my-5 italic text-white/60 font-sans text-sm md:text-base leading-relaxed">
        {children}
      </blockquote>
    )
  }

  // Fallback
  if (children) {
    return <>{children}</>
  }

  return null
}
