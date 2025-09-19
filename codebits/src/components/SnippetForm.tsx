"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function SnippetForm() {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [visibility, setVisibility] = useState("private") // padrão privado
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("snippets").insert([
      {
        title,
        language,
        description,
        code,
        visibility,
        // se já tiver Auth configurado, aqui você passaria o user_id
        // user_id: user.id
      },
    ])

    setLoading(false)

    if (error) {
      alert("❌ Erro ao salvar: " + error.message)
    } else {
      alert("✅ Snippet cadastrado com sucesso!")
      setTitle("")
      setLanguage("")
      setDescription("")
      setCode("")
      setVisibility("private")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Linguagem"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border p-2 rounded font-mono"
        rows={6}
        required
      />
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="private">Privado</option>
        <option value="public">Público</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  )
}
