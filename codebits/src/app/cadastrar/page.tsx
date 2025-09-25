import SnippetForm from "@/components/SnippetForm"

export default function AddSnippet() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">➕ Cadastrar Snippet</h1>
      <SnippetForm />
    </main>
  )
}
