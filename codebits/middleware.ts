import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//Função principal do middleware
export function middleware(request: NextRequest) {
  // Lê o cookie chamado "usuario"
  const usuario = request.cookies.get("usuario")?.value;

  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  //Se o usuário estiver logado e tentar acessar /login ou /registrar → redireciona pra home
  if (usuario && (pathname === "/login" || pathname === "/registrar")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  //Se o usuário NÃO estiver logado e tentar acessar QUALQUER outra rota → redireciona pro login
  if (
    !usuario &&
    pathname !== "/login" &&
    pathname !== "/registrar"
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  //Caso contrário, deixa a navegação continuar normalmente
  return NextResponse.next();
}

//Define onde o middleware deve atuar
export const config = {
  matcher: [
   
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
