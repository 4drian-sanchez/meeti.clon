"use client"

import { Form, FormLabel, FormInput, FormSubmit, FormError } from "@/components/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninInputs, signinSchema } from "../schemas/authSchemas";
import { signinAction } from "../actions/signin.action";
import {toast} from 'react-hot-toast'

export default function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinSchema)
  })

  const onSubmit = async (inputs : SigninInputs) => {
    const response = await signinAction(inputs)

    if(response.error) {
        toast.error(response.error)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="text"
        id="email"
        placeholder="Ingresa tu E-Mail"
        {...register('email')}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu Password"
        {...register('password')}
      />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <FormSubmit value="Iniciar sesión" />
    </Form>

  );
}