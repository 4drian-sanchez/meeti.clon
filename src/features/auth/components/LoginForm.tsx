"use client"

import { Form, FormLabel, FormInput, FormSubmit } from "@/components/forms";

export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="text"
        id="email"
        placeholder="Ingresa tu E-Mail"
      />

      <FormLabel htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu Password"
      />

      <FormSubmit value="Iniciar sesión"/>
    </Form>

  );
}