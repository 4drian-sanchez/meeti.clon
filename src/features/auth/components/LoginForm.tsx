import Form from "@/components/forms/Form";

export default function LoginForm() {
  return (
    <Form>
      <label className="block" htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Ingresa tu E-Mail"
        className="border border-slate-200 w-full p-2"
      />

      <label className="block" htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Ingresa Password"
        className="border border-slate-200 w-full p-2"
      />
    </Form>



  );
}