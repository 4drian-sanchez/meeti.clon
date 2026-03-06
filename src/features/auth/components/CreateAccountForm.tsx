"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormLabel, FormInput, FormSubmit, FormError } from "@/components/forms";
import { SignupInputs, signupSchema } from '../../schemas/authSchemas';

export default function CreateAccountForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })
    
    const onSubmit = (data : SignupInputs) => {
        console.log(data);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormInput
                type="text"
                id="name"
                placeholder="Agrega tu nombre"
                {...register('name')}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel htmlFor="email">E-Mail</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Agrega tu correo eléctronico"
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Agrega tu password"
                {...register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormLabel htmlFor="password_confirmation">Repite tu Password</FormLabel>
            <FormInput
                type="password"
                id="password_confirmation"
                placeholder="confirma tu password"
                {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

            <FormSubmit value='Crear cuenta' />
        </Form>
    );
}