import { supabase } from "@/lib/supabaseClient"
import SnippetCard from "@/components/SnippetCard"
import { Snippet } from "@/lib/types" // ou "@/lib/snippets" se você deixou a tipagem lá

export default async function PublicSnippets() {
  // Busca snippets públicos no Supabase
  const { data: snippets, error } = await supabase
    .from("snippets")
    .select("id, title, language, code, description, created_at")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error.message)
    return <p className="text-red-500">Erro ao carregar snippets públicos</p>
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Snippets Públicas</h1>
      <input
        type="text"
        placeholder="Pesquisar snippets..."
        className="border p-2 w-full mb-4"
      />

      {snippets && snippets.length > 0 ? (
        snippets.map((snippet: Snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))
      ) : (
        <p className="text-gray-400">Nenhum snippet público encontrado.</p>
      )}
    </main>
  )
}
