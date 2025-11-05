import "../globals.css"

export const metadata = {
  title: "CodeBits",
  description: "Sua biblioteca de snippets em Next.js",
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}

