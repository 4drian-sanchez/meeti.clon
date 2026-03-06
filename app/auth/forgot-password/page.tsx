import Heading from "@/components/typography/Heading";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <>
            <Heading>Recupera tu acceso a Meeti</Heading>
            <ForgotPasswordForm />

            <nav className="flex justify-between mt-20">
                <Link className="font-bold" href={'/auth/login'}>Iniciar sesión</Link>
                <Link className="font-bold" href={'/auth/create-account'}>Crear cuenta</Link>
            </nav>
        </>
    );
}