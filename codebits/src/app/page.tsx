"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SnippetCard from "@/components/SnippetCard";
import { Snippet } from "@/lib/snippets";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔹 estado do input

  useEffect(() => {
    const fetchSnippets = async () => {
      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
      } else {
        setSnippets(data || []);
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
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">■ Minhas Snippets</h1>

      <input
        type="text"
        placeholder="Pesquisar snippets..."
        value={search} // 🔹 valor controlado
        onChange={(e) => setSearch(e.target.value)} // 🔹 atualiza estado
        className="border p-2 w-full mb-4 text-white rounded placeholder-gray-400"
      />

      {filteredSnippets.length > 0 ? (
        filteredSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} showDelete={true} />
        ))
      ) : (
        <p className="text-gray-400">Nenhum snippet encontrado.</p>
      )}
    </main>
  );
}
