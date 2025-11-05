"use client";

import { useEffect, useState } from "react";
import type { Snippet } from "../lib/snippets";
import { supabase } from "../lib/supabaseClient";
import SnippetCard from "../components/SnippetCard";

export default function PublicSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const snippetsPerPage = 5;

  // 🔹 Busca snippets públicos
  useEffect(() => {
    const fetchSnippets = async () => {
      const { data, error } = await supabase
        .from("snippets")
        .select("id, title, language, code, description, created_at")
        .eq("visibility", "public");

      if (error) {
        console.error(error.message);
        setSnippets([]);
      } else {
        // Normaliza datas e embaralha resultados
        const normalized = (data ?? []).map((s: any) => ({
          ...s,
          created_at: s?.created_at ? String(s.created_at) : null,
        })) as Snippet[];

        // 🔀 Embaralha a ordem dos snippets (ordem aleatória)
        const shuffled = normalized.sort(() => Math.random() - 0.5);
        setSnippets(shuffled);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  // 🔹 Resetar pra página 1 quando fizer busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search, searchLanguage]);

  if (loading)
    return <p className="text-white text-center mt-10">Carregando snippets...</p>;

  // 🔹 Filtro por título, descrição e linguagem
  const filteredSnippets = snippets.filter(
    (snippet) =>
      (snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase())) &&
      (searchLanguage === "" ||
        snippet.language.toLowerCase().includes(searchLanguage.toLowerCase()))
  );

  // 🔹 Paginação
  const indexOfLastSnippet = currentPage * snippetsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(
    indexOfFirstSnippet,
    indexOfLastSnippet
  );
  const totalPages = Math.ceil(filteredSnippets.length / snippetsPerPage);

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Snippets Públicos</h1>

      {/* 🔹 Barra de busca */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-600 p-2 w-full text-white rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
        />
        <input
          type="text"
          placeholder="Filtrar por linguagem (ex: JavaScript)"
          value={searchLanguage}
          onChange={(e) => setSearchLanguage(e.target.value)}
          className="border border-gray-600 p-2 w-full text-white rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      {/* 🔹 Lista de snippets */}
      {filteredSnippets.length > 0 ? (
        currentSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))
      ) : (
        <p className="text-gray-400 text-center">Nenhum snippet público encontrado.</p>
      )}

      {/* 🔹 Controles de paginação */}
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
