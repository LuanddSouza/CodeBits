"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import SnippetCard from "./components/SnippetCard";
import { Snippet } from "./lib/snippets";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

export default function MinhasSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const snippetsPerPage = 5;
  // Mostrar botão de voltar ao topo
  const [showScrollTop, setShowScrollTop] = useState(false);



  // Busca as snippets do usuário logado
  useEffect(() => {
    const fetchSnippets = async () => {
      const userCookie = Cookies.get("usuario");
      if (!userCookie) {
        console.warn("Nenhum usuário logado.");
        setLoading(false);
        return;
      }

      try {
        const decoded = decodeURIComponent(userCookie);
        const userData = JSON.parse(decoded);
        const userId = userData.id;

        //  Busca apenas as snippets do usuário logado
        const { data, error } = await supabase
          .from("snippets")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao carregar snippets:", error.message);
        } else {
          setSnippets(data || []);
        }
      } catch (err) {
        console.error("Erro ao ler cookie de usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  //ir para o topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Reseta pra primeira página ao pesquisar
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Filtragem por título ou descrição
  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeletedSnippet = (id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
  };


  // Paginação
  const indexOfLastSnippet = currentPage * snippetsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(indexOfFirstSnippet, indexOfLastSnippet);
  const totalPages = Math.ceil(filteredSnippets.length / snippetsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">Minhas Snippets</h1>

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar snippets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-600 p-2 w-full mb-6 text-white rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 outline-none"
      />

      {/* Lista de snippets */}
      {filteredSnippets.length > 0 ? (
        currentSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            showDelete={true}
            onDelete={handleDeletedSnippet}
          />

        ))
      ) : (
        <p className="text-gray-400 text-center">Nenhum snippet encontrado.</p>
      )}

      {/* Paginação */}
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
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-600 transition"
          >
            Próxima →
          </button>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-300 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
        >
          ↑
        </button>
      )}
    </main>
  );
}
