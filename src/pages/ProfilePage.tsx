
import { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/auth/authSlice";
import { apiRequest } from "../services/api";
import type { RootState } from "../app/store";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name ?? "");
  const [surname, setSurname] = useState(user?.surname ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [cellNumber, setCellNumber] = useState(user?.cellNumber ?? "");

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    const updated = { ...user, name, surname, email, cellNumber };

    try {
      await apiRequest(`/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ name, surname, email, cellNumber })
      });
      dispatch(updateUser(updated));
      toast.success("Profile updated");
    } catch {
      toast.error("Unable to update profile");
    }
  }

  return (
    <main className="page-container">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1>My Profile</h1>
      <p className="muted">Manage your personal information.</p>

      <form className="panel profile-form" onSubmit={saveProfile}>
        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <h2>Personal information</h2>

        <label>Name</label>
        <input required value={name}
          onChange={(e) => setName(e.target.value)} />

        <label>Surname</label>
        <input required value={surname}
          onChange={(e) => setSurname(e.target.value)} />

        <label>Email address</label>
        <input required type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <label>Cell number</label>
        <input required type="tel" value={cellNumber}
          onChange={(e) => setCellNumber(e.target.value)} />

        <button className="primary-btn" type="submit">
          Save changes
        </button>
      </form>

      <section className="panel">
        <h2>Login details</h2>
        <p className="muted">
          Password changes require a secure authentication backend.
          This feature will be connected when authentication is implemented.
        </p>
      </section>
    </main>
  );
}
