"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { User, Menu, X } from "lucide-react";
import Cookies from "js-cookie";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usuario, setUsuario] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Verifica login
useEffect(() => {
  const userCookie = Cookies.get("usuario");
  if (userCookie) {
    try {
      //Decodifica antes de converter
      const decoded = decodeURIComponent(userCookie);
      const userData = JSON.parse(decoded);
      setUsuario(userData.user);
    } catch (error) {
      console.error("Erro ao ler cookie de usuário:", error);
      setUsuario(null);
    }
  } else {
    setUsuario(null);
  }
}, []);

  // Fecha menu do usuário ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("usuario", { path: "/" }); // garante que remove corretamente
    localStorage.removeItem("usuario");
    setUsuario(null);
    router.push("/login");
    setMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-800 bg-[#0e1621] shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white relative">
        {/* 🔹 Logo */}
        <Link
          href="/"
          className="text-2xl font-bold hover:text-blue-500 transition"
        >
          Code<span className="text-blue-500">Bits</span>
        </Link>

        {/* 🔹 Menu Desktop */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/cadastrar" className="hover:text-blue-400 transition">
            Adicionar
          </Link>
          <Link href="/publicas" className="hover:text-blue-400 transition">
            Snippets Públicos
          </Link>
        </nav>

        {/* 🔹 Ícone do usuário */}
        <div className="flex items-center gap-3">
          {/* Menu hambúrguer mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Ícone de usuário */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-800 transition relative"
            >
              <User size={24} />
            </button>

            {menuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-44 z-20 text-sm overflow-hidden">
                <p className="px-4 py-2 text-blue-500 border-b border-gray-700 truncate">
                  {usuario}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Menu Mobile (abre abaixo do header) */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-[#131c28] border-t border-gray-800 flex flex-col items-center py-4 space-y-3 text-base font-medium md:hidden z-10">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>
            <Link
              href="/cadastrar"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Adicionar
            </Link>
            <Link
              href="/publicas"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Snippets Públicos
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
