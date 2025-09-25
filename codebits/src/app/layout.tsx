import "./globals.css"
import Header from "@/components/Header"
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "CodeBits",
  description: "Sua biblioteca de snippets em Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}


