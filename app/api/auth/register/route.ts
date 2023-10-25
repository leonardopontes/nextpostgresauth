import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// função assíncrona POST(req: Requisição) {
export async function POST(req: Request) {
  // { email, senha } ligando a = aguardar requisição.json();
  const { email, password } = await req.json();
  // existe ligando a = aguardar prisma.encontrarÚnico.usuário({
  const exists = await prisma.user.findUnique({
    // onde: {
    where: {
      // email,
      email,
    },
  });
  // Se (existe) {
  if (exists) {
    // retornar NextResposta.json({ erro: "Usuário já existe"}, { status: 400});
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  // Se não {  
  } else {
    // usuário ligando a = aguardar prisma.criar.usuário({
    const user = await prisma.user.create({
      // dados: {
      data: {
        // email,
        email,
        // senha: aguardar hash(senha, 10),
        password: await hash(password, 10),
      },
    });
    // retornar NextResposta.json(usuário);
    return NextResponse.json(user);
  }
}
