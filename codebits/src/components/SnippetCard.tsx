"use client"

import { Snippet } from "@/lib/snippets"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  const copyCode = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        // API moderna
        navigator.clipboard.writeText(snippet.code)
      } else {
        // fallback usando textarea
        const textArea = document.createElement("textarea")
        textArea.value = snippet.code
        textArea.style.position = "fixed"
        textArea.style.top = "0"
        textArea.style.left = "0"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      //alert("✅ Snippet copiado!")
    } catch (err) {
      console.error(err)
      alert("❌ Erro ao copiar snippet")
    }
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
