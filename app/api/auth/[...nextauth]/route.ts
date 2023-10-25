import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

// Opções de autenticação: Opções do NextAuth, contendo = {
export const authOptions: NextAuthOptions = {
  // provedores: [
  providers: [
    // Provedor de Credenciais({
    CredentialsProvider({
      // credenciais: {
      credentials: {
        // email: { label: "Email", tipo: "email" },
        email: { label: "Email", type: "email" },
        // senha: { label: "Senha", tipo: "Senha" }
        password: { label: "Password", type: "password" }
      },
      // função assíncrona de autorizar(credenciais) {
      async authorize(credentials) {
        // { email, senha } ligando a = credenciais ?? {}
        const { email, password } = credentials ?? {}
        // Se (!email ou !senha) forem falsos {
        if (!email || !password) {
          // lançar novo Erro("Nome de usuário ou senha ausente");
          throw new Error("Missing username or password");
        }
        // usuário ligando a = aguardar prisma.encontrarÚnico.usuário({
        const user = await prisma.user.findUnique({
          // onde: {
          where: {
            // email,
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        // Se (!usuário ou !(aguardar comparar(senha, usuários com.senha))) { for falso 
        if (!user || !(await compare(password, user.password))) {
          // lançar novo Erro("nome de usuário ou senha Inválido");
          throw new Error("Invalid username or password");
        }
        // retornar usuário;
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
