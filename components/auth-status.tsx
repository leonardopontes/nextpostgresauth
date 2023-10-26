import { unstable_getServerSession } from "next-auth/next";
// exportar por padrão função assíncrona de Status de Autenticação {
export default async function AuthStatus() {
  // sessão ligando a = aguardar pegar Sessão de Servidor_instável();
  const session = await unstable_getServerSession();
  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-200 text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
}
