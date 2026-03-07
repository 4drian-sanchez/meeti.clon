"use client"

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword, resetPasswordSchema } from "../schemas/authSchemas";
import { useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
import { ResetPasswordAction } from "../actions/reset-password.action";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')!

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async ( data: ResetPassword ) => {
        const {error, success} = await ResetPasswordAction(data, token);

        if(error) {
            toast.error(error)
        }

        if(success) {
            toast.success(success)
            redirect('/auth/login')
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="newPassword">Nueva password</FormLabel>
            <FormInput
                type="password"
                id="newPassword"
                placeholder="Ingresa tu nueva password"
                {...register('newPassword')}
            />
            {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}

            <FormLabel htmlFor="passwordConfirmation">repetir password</FormLabel>
            <FormInput
                type="password"
                id="passwordConfirmation"
                placeholder="repite tu nueva password"
                {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

            <FormSubmit value='Cambiar password' />
        </Form>
    );
}