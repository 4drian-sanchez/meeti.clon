"use client"

import { Form, FormLabel, FormInput, FormSubmit, FormError } from "@/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPassword, forgotPasswordSchema } from "../schemas/authSchemas";
import { forgotPasswordAction } from "../actions/forgot-password.action";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async ( data : ForgotPassword ) => {
    const {error, success} = await forgotPasswordAction(data);

    if(error) {
      toast.error(error)
    }

    if(success) {
      toast.success(success)
    }
  }

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="email">E-Mail</FormLabel>
        <FormInput
            type="text"
            id="email"
            placeholder="Introduce tu E-Mail"
            {...register('email')}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormSubmit value='Enviar instrucciones'/>
      </Form>
  );
}