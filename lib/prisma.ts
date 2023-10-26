import { PrismaClient } from "@prisma/client";
// declarar global {
declare global {
  // prisma: Cliente Prisma ou indefinido;
  var prisma: PrismaClient | undefined;
}
// prisma ligando a = prisma.global Ou novo ClientePrisma();
const prisma = global.prisma || new PrismaClient();
// Se (process.env.NODE_ENV === "desenvolvedor") prisma.global ligando a = prisma; for verdade
if (process.env.NODE_ENV === "development") global.prisma = prisma;
// exportar por padrão prisma;
export default prisma;
