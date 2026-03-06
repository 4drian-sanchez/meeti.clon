import { Metadata } from "next";
import Heading from '@/components/typography/Heading'
import generatePageTitle from "@/src/shared/utils/metadata";
import CreateAccountForm from "@/features/auth/components/CreateAccountForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle('Crear Cuenta')
}

export default function RegisterPage() {
  return (
    <>
      <Heading>Crear Cuenta</Heading>
      <CreateAccountForm />

      <nav className="flex justify-between mt-20">
        <Link className="font-bold" href={'/auth/login'}>Iniciar sesión</Link>
        <Link className="font-bold" href={'/auth/forgot-password'}>Olvide mi password</Link>
      </nav>
    </>
  )
}