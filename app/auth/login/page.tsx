import { Metadata } from "next";
import Heading from '@/components/typography/Heading'
import LoginForm from '@/features/auth/components/LoginForm'
import generatePageTitle from "@/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle('Iniciar Sesión')
}

export default function LoginPage() {
  return (
    <>
      <Heading>Iniciar Sesión</Heading>
      <LoginForm />
    </>
  )
}