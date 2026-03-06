"use client"

import { Form, FormLabel, FormInput, FormSubmit } from "@/components/forms";

export default function ForgotPasswordForm() {
  return (
      <Form>
        <FormLabel htmlFor="email">E-Mail</FormLabel>
        <FormInput
            type="text"
            id="email"
            placeholder="Introduce tu E-Mail"
        />

        <FormSubmit value='Enviar instrucciones'/>
      </Form>
  );
}