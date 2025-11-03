"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //Busca usuário no banco
      const { data: user, error: queryError } = await supabase
        .from("usuarios")
        .select("id, user, pass")
        .eq("user", username)
        .single();

      if (queryError && queryError.code !== "PGRST116") throw queryError;

      if (!user || user.pass !== password) {
        setError("Usuário ou senha incorretos.");
        setLoading(false);
        return;
      }

      //Login bem-sucedido → salva cookie em formato JSON
      Cookies.set(
        "usuario",
        JSON.stringify({
          id: user.id,
          user: user.user,
        }),
        { path: "/" }
      );

      // Redireciona para a home
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-20">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🚀 Code<span className="text-blue-500">Bits</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Ainda não tem conta?{" "}
          <a href="/registrar" className="text-blue-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
