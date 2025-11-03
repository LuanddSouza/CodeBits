"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SnippetCard from "@/components/SnippetCard";
import { Snippet } from "@/lib/snippets";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const snippetsPerPage = 5;

  //Busca os snippets no Supabase
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

  //Reseta pra primeira página ao pesquisar
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;

  //Filtragem
  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(search.toLowerCase()) ||
    snippet.description.toLowerCase().includes(search.toLowerCase())
  );

  //Paginação
  const indexOfLastSnippet = currentPage * snippetsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(indexOfFirstSnippet, indexOfLastSnippet);

  const totalPages = Math.ceil(filteredSnippets.length / snippetsPerPage);

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">■ Minhas Snippets</h1>

      {/*Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar snippets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-600 p-2 w-full mb-6 text-white rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
      />

      {/*Lista de snippets */}
      {filteredSnippets.length > 0 ? (
        currentSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} showDelete={true} />
        ))
      ) : (
        <p className="text-gray-400 text-center">Nenhum snippet encontrado.</p>
      )}

      {/*Controles de paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-600 transition"
          >
            ← Anterior
          </button>

          <span className="text-gray-300 text-sm">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-600 transition"
          >
            Próxima →
          </button>
        </div>
      )}
    </main>
  );
}
