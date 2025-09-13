import { snippets } from "@/lib/snippets"
import SnippetCard from "@/components/SnippetCard"

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Snippets publicas</h1>
      <input type="text" placeholder="Pesquisar snippets..." className="border p-2 w-full mb-4" />
      {snippets.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </main>
  )
}
