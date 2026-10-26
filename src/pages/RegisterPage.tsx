
import { useState } from "react";
import type { FormEvent } from "react";
import { apiRequest } from "../services/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    cellNumber: "",
    password: "",
  });

  function updateField(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const existing = await apiRequest<{ id: string }[]>(
        `/users?email=${encodeURIComponent(form.email)}`
      );

      if (existing.length > 0) {
        toast.error("An account with this email already exists");
        return;
      }

      // Demo only: never store plaintext passwords in production.
      await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          id: crypto.randomUUID(),
        }),
      });

      toast.success("Account created. You can now log in.");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h1>Create your account</h1>
        <p className="muted">Start organising your shopping.</p>

        <label>Name</label>
        <input required value={form.name}
          onChange={(e) => updateField("name", e.target.value)} />

        <label>Surname</label>
        <input required value={form.surname}
          onChange={(e) => updateField("surname", e.target.value)} />

        <label>Email address</label>
        <input required type="email" value={form.email}
          onChange={(e) => updateField("email", e.target.value)} />

        <label>Cell number</label>
        <input required type="tel" value={form.cellNumber}
          onChange={(e) => updateField("cellNumber", e.target.value)} />

        <label>Password</label>
        <input required type="password" minLength={8}
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)} />

        <button className="primary-btn" type="submit">
          Create account
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
