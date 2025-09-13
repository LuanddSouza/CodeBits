"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full border-b shadow-sm bg-gray-900">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white-600">
          🚀 CodeBits
        </Link>

        {/* Navegação */}
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/cadastrar" className="hover:text-blue-600">
            Adicionar
          </Link>
          <Link href="/publicas" className="hover:text-blue-600">
            Snippets Publicos
          </Link>
        </nav>
      </div>
    </header>
  )
}
