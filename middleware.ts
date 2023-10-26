import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// exportar por padrão função assíncrona middleware(requisição: RequisiçãoNext) {
export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  // caminho = requisição.Urlnext.nomedocaminho;
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  // Se (caminho === "/" {
  if (path === "/") {
    // retornar RespostaNext.next();
    return NextResponse.next();
  }
  // sessão = aguardar pegarToken
  const session = await getToken({
    // requisição,
    req,
    // secreta: process.env.NEXTAUTH_SECRET,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // Se (!sessão && caminho === "/protected") { forem verdadeiros / igual e tipo
  if (!session && path === "/protected") {
    // retornar RespostaNext.redirecionar(nova URL("/login", requisição.url));
    return NextResponse.redirect(new URL("/login", req.url));
  // Se não se (sessão && (caminho === "/login" Ou caminho === "/registro")) {  
  } else if (session && (path === "/login" || path === "/register")) {
    // retornar RespostaNext.redirecionar(nova URL("/protected", requisição.url));
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  // retornar RespostaNext.next();
  return NextResponse.next();
}
