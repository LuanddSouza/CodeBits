"use client";

import { useState } from "react";
import { supabase } from "../../(site)/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // 🔹 Validação simples
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Verifica se o usuário já existe
      const { data: existingUser, error: checkError } = await supabase
        .from("usuarios")
        .select("user")
        .eq("user", username)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }

      if (existingUser) {
        setError("Usuário já cadastrado.");
        setLoading(false);
        return;
      }

      // 🔹 Insere novo usuário
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert([{ user: username, pass: password, name: user }]);

      if (insertError) {
        throw insertError;
      }

      setSuccess("Conta criada com sucesso!");
      setLoading(false);

      // Redireciona pro login após 2 segundos
      setTimeout(() => router.push("/login"), 600);
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-15">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🧠 Code<span className="text-blue-500">Bits</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Como deseja ser chamado?</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Digite seu nome"
              required
            />
          </div>
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

          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
