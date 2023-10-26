"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
// exportar por padrão funcção de Formulário({ tipo }: { tipo: "login" ou "registro" }) {
export default function Form({ type }: { type: "login" | "register" }) {
  // [carregar, definir Carregamento] ligando a = uso de Estado(falso);
  const [loading, setLoading] = useState(false);
  // rota ligando a = uso de Rota();
  const router = useRouter();

  return (
    <form
      // ativar Envio ligando a ={(e) contendo => { 
      onSubmit={(e) => {
        // e/evitar por padrão();
        e.preventDefault();
        // definirCarregamento(verdadeiro);
        setLoading(true);
        // Se (tipo === "login") { for igual valor e tipo
        if (type === "login") {
          // entrar("credenciais", {
          signIn("credentials", {
            // redirecionar: falso,
            redirect: false,
            // email: e.Alvo atual.valor de.email,
            email: e.currentTarget.email.value,
            // senha: e.Alvo atual.valor de.senha,
            password: e.currentTarget.password.value,
            // @ts-ignore
          // }).então(({ erro }) contendo => {  
          }).then(({ error }) => {
            // Se (erro) { for verdade
            if (error) {
              // definir Carregamento(falso); 
              setLoading(false);
              // toast.erro(erro);
              toast.error(error);
            // Se não {  
            } else {
              // atualizar.rota();
              router.refresh();
              // puxar.rota("/protected");
              router.push("/protected");
            }
          });
        // Se não {  
        } else {
          // buscar("/api/auth/register", {
          fetch("/api/auth/register", {
            // método: "POST",
            method: "POST",
            // cabeçalho: {
            headers: {
              // "Conteúdo-Tipo": "application/json",
              "Content-Type": "application/json",
            },
            // corpo: restringir.JSON({
            body: JSON.stringify({
              // email: e.Alvo atual.valor de.email,
              email: e.currentTarget.email.value,
              // senha: e.Alvo atual.valor de.senha,
              password: e.currentTarget.password.value,
            }),
          // }).então(assíncrona (resposta) => contendo {  
          }).then(async (res) => {
            // definirCarregamento(falso);
            setLoading(false);
            // Se (status.resposta === 200) { for igual valor e tipo
            if (res.status === 200) {
              // toast.succeso("Conta criada! Redirecionando para login...");
              toast.success("Account created! Redirecting to login...");
              // definir Tempo esgotado(() contendo => {
              setTimeout(() => {
                // puxar.rota("/login");
                router.push("/login");
              // }, 2000); de tempo
              }, 2000);
            // Se não {  
            } else {
              // { erro } ligando a = aguardar resposta.json()
              const { error } = await res.json();
              // toast.erro(erro);
              toast.error(error);
            }
          });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
