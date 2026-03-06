"use client"

import {Form, FormLabel} from "@/components/forms";

export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">Email</FormLabel>
      <input
        type="text"
        id="email"
        placeholder="Ingresa tu E-Mail"
        className="border border-slate-200 w-full p-2"
      />

      <FormLabel htmlFor="password">Email</FormLabel>
      <input
        type="password"
        id="password"
        placeholder="Ingresa Password"
        className="border border-slate-200 w-full p-2"
      />
    </Form>



  );
}