"use client"
import { useState } from "react"

export default function SnippetForm() {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, language, description, code })
    alert("Snippet cadastrado (simulado)")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Linguagem"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Código"
        value={code}
        onChange={e => setCode(e.target.value)}
        className="w-full border p-2 rounded font-mono"
        rows={6}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Salvar
      </button>
    </form>
  )
}
