import type { Snippet } from "@/lib/snippets";
import { supabase } from "@/lib/supabaseClient";
import SnippetCard from "@/components/SnippetCard";

export default async function PublicSnippets() {
  const { data, error } = await supabase
    .from("snippets")
    .select("id, title, language, code, description, created_at")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return <p className="text-red-500">Erro ao carregar snippets públicos</p>;
  }

  // garante que temos um array e que created_at é string (serializável)
  const snippets = (data ?? []).map((s: any) => ({
    ...s,
    created_at: s?.created_at ? String(s.created_at) : null,
  })) as Snippet[];

  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📚 Snippets Públicos</h1>

      <input
        type="text"
        placeholder="Pesquisar snippets..."
        className="border p-2 w-full mb-4 text-white rounded"
      />

      {snippets.length > 0 ? (
        <ul className="space-y-4">
          {snippets.map((snippet) => (
            <li key={snippet.id}>
      
              <SnippetCard snippet={snippet} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhum snippet público encontrado.</p>
      )}
    </main>
  );
}
