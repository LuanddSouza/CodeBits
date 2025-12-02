"use client";

import { Snippet } from "../lib/snippets";
import { deleteSnippet } from "../lib/snippetsdell";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Trash2, Copy, SquarePen, Maximize } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SnippetCard({
  snippet,
  showDelete = false,
  onDelete,
}: {
  snippet: Snippet;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const getLanguage = (lang: string) => {
    const supported = ["javascript", "typescript", "python", "html", "css", "java"];
    return supported.includes(lang?.toLowerCase() ?? "") ? lang.toLowerCase() : "javascript";
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao copiar snippet");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Excluir "${snippet.title}"?`,
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteSnippet(snippet.id);
        toast.success("Snippet deletado!");
        if (onDelete) onDelete(snippet.id);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao excluir snippet");
      } finally {
        setLoading(false);
      }
    }
  };

  const editSnippet = () => {
    router.push(`/edit/${snippet.id}`);
  };

  // --------------------------------------------------------
  // MAXIMIZED VIEW
  // --------------------------------------------------------
  if (isMaximized) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 w-full max-w-5xl rounded-xl p-6 overflow-auto max-h-[90vh]">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white break-words">
              {snippet.title}
            </h2>

            <button
              onClick={() => setIsMaximized(false)}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✖
            </button>
          </div>

          <p className="text-gray-300 mb-4">{snippet.description}</p>
          <p className="text-gray-300 mb-4">username</p>

          <SyntaxHighlighter
            language={getLanguage(snippet.language)}
            style={oneDark}
            showLineNumbers
            wrapLongLines
            customStyle={{
              borderRadius: "8px",
              fontSize: "0.95rem",
              backgroundColor: "#1e1e1e",
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // NORMAL VIEW
  // --------------------------------------------------------
  return (
    <div
      className="
        w-full
        sm:w-[90%]
        md:w-[600px]
        lg:w-[700px]
        xl:w-[720px]
        mx-auto
        p-4
        border border-gray-700
        rounded-xl
        shadow-sm
        bg-gray-800
        mb-6
        transition
        hover:shadow-lg
        hover:border-gray-600
      "
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-white break-words">
          {snippet.title}
        </h2>

        <div className="flex items-center gap-2">
          {showDelete && (
            <>
              <button
                onClick={editSnippet}
                className="text-yellow-500 hover:text-yellow-700 disabled:opacity-50"
                disabled={loading}
              >
                <SquarePen size={20} />
              </button>

              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
                disabled={loading}
              >
                <Trash2 size={20} />
              </button>
            </>
          )}

          <button
            onClick={() => setIsMaximized(true)}
            className="text-gray-300 hover:text-white"
            disabled={loading}
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3 break-words">
        {snippet.description}
      </p>

      <p className="text-xs text-gray-400 mb-2">Autor: {snippet.author}</p>


      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={getLanguage(snippet.language)}
          style={oneDark}
          showLineNumbers
          wrapLongLines
          customStyle={{
            borderRadius: "8px",
            fontSize: "0.85rem",
            backgroundColor: "#1e1e1e",
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
        <button
          onClick={copyCode}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
        >
          {copied ? "Copiado!" : (
            <>
              <Copy size={16} /> Copiar
            </>
          )}
        </button>

        <h3 className="text-xs text-gray-400">{snippet.language}</h3>
      </div>
    </div>
  );
}