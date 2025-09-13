"use client"

import { Snippet } from "@/lib/snippets"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code)
    alert("Snippet copiado!")
  }

  return (
    <div className="p-4 border border-gray-700 rounded-xl shadow-sm bg-gray-800 mb-4">
      <h2 className="text-lg font-semibold text-white">{snippet.title}</h2>
      <p className="text-sm text-gray-300">{snippet.description}</p>

      <SyntaxHighlighter
        language={snippet.language.toLowerCase()}
        style={oneDark}
        wrapLines={true}
        customStyle={{ borderRadius: "0.5rem", padding: "1rem" }}
      >
        {snippet.code}
      </SyntaxHighlighter>

      <button
        onClick={copyCode}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Copiar
      </button>
    </div>
  )
}
