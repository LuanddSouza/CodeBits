"use client"; // ⚠️ importante: Client Component para copiar funcionar

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SnippetCard from "@/components/SnippetCard";
import { Snippet } from "@/lib/snippets";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">■ Minhas Snippets</h1>

      <input
        type="text"
        placeholder="Pesquisar snippets..."
        className="border p-2 w-full mb-4 text-white rounded bg-gray-900"
      />

      {snippets.length > 0 ? (
        snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} showDelete={true} />
        ))
      ) : (
        <p className="text-gray-400">Nenhum snippet encontrado.</p>
      )}
    </main>
  );
}
