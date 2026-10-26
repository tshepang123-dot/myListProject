
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { apiRequest } from "../services/api";
import type { User } from "../types";
import toast from "react-hot-toast";
import { ShoppingBasket } from "lucide-react";

interface DemoUser extends User {
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      // Demo only: replace with a secure authentication API.
      const users = await apiRequest<DemoUser[]>(
        `/users?email=${encodeURIComponent(email)}`
      );

      const user = users.find((item) => item.password === password);

      if (!user) {
        toast.error("Invalid email or password");
        return;
      }

      const { password: _password, ...safeUser } = user;
      dispatch(loginSuccess(safeUser));
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Could not connect. Check that JSON Server is running.");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <div className="auth-logo"><ShoppingBasket size={34} /></div>
        <h1>Welcome back</h1>
        <p className="muted">Your shopping, organised.</p>

        <label>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button className="primary-btn" type="submit">Log in</button>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </main>
  );
}
