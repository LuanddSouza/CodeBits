"use client";

import { Snippet } from "../lib/snippets";
import { deleteSnippet } from "../lib/snippetsdell";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Trash2, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SnippetCard({
  snippet,
  showDelete = false,
}: {
  snippet: Snippet;
  showDelete?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getLanguage = (lang: string) => {
    const supported = ["javascript", "typescript", "python", "html", "css", "java"];
    return supported.includes(lang?.toLowerCase() ?? "") ? lang.toLowerCase() : "javascript";
  };

  // Função de copiar código para clipboard
  const copyCode = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        // toast.success("✅ Código copiado!");
        setTimeout(() => setCopied(false), 1500);
      } else {
        // Fallback para navegadores sem API de clipboard
        const textarea = document.createElement("textarea");
        textarea.value = snippet.code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        setCopied(true);
        // toast.success("✅ Código copiado (fallback)!");
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao copiar snippet");
    }
  };

  // Função de deletar snippet com confirmação
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
        toast.success("✅ Snippet deletado!");
        router.refresh(); // Atualiza a página automaticamente
      } catch (err) {
        console.error(err);
        toast.error("❌ Erro ao excluir snippet");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 border border-gray-700 rounded-xl shadow-sm bg-gray-800 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">{snippet.title}</h2>

        {showDelete && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 disabled:opacity-50"
            disabled={loading}
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-300">{snippet.description}</p>

      <SyntaxHighlighter
        language={getLanguage(snippet.language)}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{ borderRadius: "8px", fontSize: "0.9rem" }}
      >
        {snippet.code}
      </SyntaxHighlighter>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={copyCode}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
        >
          {copied ? "Copiado!" : <><Copy size={16} /> Copiar</>}
        </button>

        <h3 className="text-xs text-gray-400 mt-2">{snippet.language}</h3>

      </div>
    </div>
  );
}
