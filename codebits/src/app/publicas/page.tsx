"use client";

import { useEffect, useState } from "react";
import type { Snippet } from "@/lib/snippets";
import { supabase } from "@/lib/supabaseClient";
import SnippetCard from "@/components/SnippetCard";

export default function PublicSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // estado do input
  const [searchLinguage, setSearchLanguage] = useState("");

  useEffect(() => {
    const fetchSnippets = async () => {
      const { data, error } = await supabase
        .from("snippets")
        .select("id, title, language, code, description, created_at")
        .eq("visibility", "public")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
        setSnippets([]);
      } else {
        // garante que created_at seja serializável
        const normalized = (data ?? []).map((s: any) => ({
          ...s,
          created_at: s?.created_at ? String(s.created_at) : null,
        })) as Snippet[];
        setSnippets(normalized);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  if (loading) return <p className="text-white">Carregando...</p>;

  // 🔹 Filtragem pelo título ou descrição
  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(search.toLowerCase()) ||
    snippet.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📚 Snippets Públicos</h1>

      <div className="mb-4 flex flex-row gap-2">
        <input
          type="text"
          placeholder="Pesquisar snippets..."
          value={search} // 🔹 valor controlado
          onChange={(e) => setSearch(e.target.value)} // 🔹 atualiza estado
          className="border p-2 w-full mb-4 text-white rounded placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Pesquisar snippets..."
          className="border p-2 w-50 mb-4 text-white rounded placeholder-gray-400"
          value={searchLinguage}
          //onChange=
        />
      </div>

      {filteredSnippets.length > 0 ? (
        <ul className="space-y-4">
          {filteredSnippets.map((snippet) => (
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
