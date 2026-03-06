import { Form, FormLabel, FormInput, FormSubmit } from "@/components/forms";

export default function CreateAccountForm() {
  return (
      <Form>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <FormInput 
            type="text"
            id="name"
            placeholder="Agrega tu nombre"
        />

        <FormLabel htmlFor="email">E-Mail</FormLabel>
        <FormInput 
            type="email"
            id="email"
            placeholder="Agrega tu correo eléctronico"
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput 
            type="password"
            id="password"
            placeholder="Agrega tu password"
        />

        <FormLabel htmlFor="password_confirmation">Repite tu Password</FormLabel>
        <FormInput 
            type="password"
            id="password_confirmation"
            placeholder="confirma tu password"
        />

        <FormSubmit value='Crear cuenta'/>
      </Form>
  );
}