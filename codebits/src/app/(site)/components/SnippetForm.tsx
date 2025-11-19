"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Maximize } from "lucide-react";
import Cookies from "js-cookie";

type SnippetData = {
  id?: string;
  title?: string;
  language?: string;
  description?: string;
  code?: string;
  visibility?: string;
};

export default function SnippetForm({
  initialData = null,
  mode = "create",
}: {
  initialData?: SnippetData | null;
  mode?: "create" | "edit";
}) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);

  const [isMaximized, setIsMaximized] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  // Carrega os dados no modo edição
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setLanguage(initialData.language || "");
      setDescription(initialData.description || "");
      setCode(initialData.code || "");
      setVisibility(initialData.visibility || "public");
    }
  }, [initialData]);

  useEffect(() => {
    if (isMaximized && codeRef.current) {
      codeRef.current.focus();
    }
  }, [isMaximized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const usuario = JSON.parse(Cookies.get("usuario") || "{}");
    const userId = usuario.id;

    if (!userId) {
      toast.error("Usuário não identificado. Faça login novamente.");
      setLoading(false);
      return;
    }

    let error = null;

    if (mode === "edit") {
      // ---------------------------
      // ATUALIZAÇÃO
      // ---------------------------
      if (!initialData || !initialData.id) {
        toast.error("Dados do snippet não encontrados para edição.");
        setLoading(false);
        return;
      }
      const result = await supabase
        .from("snippets")
        .update({
          title,
          language,
          description,
          code,
          visibility,
        })
        .eq("id", initialData.id);

      error = result.error;
    } else {
      // ---------------------------
      //  CRIAÇÃO
      // ---------------------------
      const result = await supabase.from("snippets").insert([
        { title, language, description, code, visibility, user_id: userId },
      ]);
      error = result.error;
    }

    setLoading(false);

    if (error) {
      toast.error("❌ Erro ao salvar: " + error.message);
    } else {
      toast.success(mode === "edit" ? "Snippet atualizada!" : "Snippet criada!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = "/";
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {isMaximized && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 z-[9999]">
          <div className="bg-gray-900 w-full max-w-5xl rounded-xl p-6 max-h-[90vh] overflow-auto border border-gray-700">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white font-semibold">
                Editar código
              </h2>

              <button
                onClick={() => setIsMaximized(false)}
                className="text-gray-400 hover:text-white transition text-xl"
              >
                ✖
              </button>
            </div>

            <textarea
              ref={codeRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[65vh] p-4 rounded-lg font-mono text-white bg-gray-800 border border-gray-600"
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          required
        />

        <input
          type="text"
          placeholder="Linguagem"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          required
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 min-h-[100px]"
        />

        <div className="relative w-full">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código..."
            className="w-full h-48 p-4 pr-12 rounded-lg font-mono text-white bg-gray-800 border border-gray-700 resize-vertical"
          />

          <button
            type="button"
            onClick={() => setIsMaximized(true)}
            className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-700 transition"
          >
            <Maximize size={20} className="text-white" />
          </button>
        </div>

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
        >
          <option value="public">Público</option>
          <option value="private">Privado</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition"
        >
          {loading ? "Salvando..." : mode === "edit" ? "Atualizar Snippet" : "Salvar Snippet"}
        </button>
      </form>
    </>
  );
}
