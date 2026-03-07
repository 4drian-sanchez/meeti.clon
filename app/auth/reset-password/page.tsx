import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import Heading from "@/src/shared/components/typography/Heading";
import generatePageTitle from "@/src/shared/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";


export const metadata : Metadata = {
    title: generatePageTitle('Cambia tu password')
}

export default function ResetPasswordPAge() {
    return (
        <>
            <Heading>Cambia tu password</Heading>
            <ResetPasswordForm />
            <nav className="flex justify-between mt-20">
                <Link className="font-bold" href={'/auth/login'}>Iniciar sesión</Link>
                <Link className="font-bold" href={'/auth/create-account'}>Crear cuenta</Link>
            </nav>
        </>
    );
}