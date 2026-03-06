import { Metadata } from "next";
import Heading from '@/components/typography/Heading'
import generatePageTitle from "@/src/shared/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle('Crear Cuenta')
}

export default function RegisterPage() {
  return (
    <>
      <Heading>Crear Cuenta</Heading>
    </>
  )
}