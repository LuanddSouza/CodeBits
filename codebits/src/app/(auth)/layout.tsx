// app/(auth)/layout.tsx
import "../globals.css";
import Link from "next/link";

export const metadata = {
  title: "CodeBits",
  description: "Sua biblioteca de snippets em Next.js",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <nav>
            <div>
              <h1>
                Code<span>Bits</span>
              </h1>
              <div>
                <Link href="/login">Login</Link>
                <Link href="/registrar">Registrar-se</Link>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
