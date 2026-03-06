import { Metadata } from "next";
import Heading from '@/components/typography/Heading'
import LoginForm from '@/features/auth/components/LoginForm'
import generatePageTitle from "@/utils/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle('Iniciar Sesión')
}

export default function LoginPage() {
  return (
    <>
      <Heading>Iniciar Sesión</Heading>
      <LoginForm />

      <nav className="flex justify-between mt-20">
        <Link className="font-bold" href={'/auth/create-account'}>Crear cuenta</Link>
        <Link className="font-bold" href={'/auth/forgot-password'}>Olvide mi password</Link>
      </nav>
    </>
  )
}