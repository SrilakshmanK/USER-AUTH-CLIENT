import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form, {
        withCredentials: true,
      });
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="">Register</h2>
      {error && <p className="error">{error}</p>}
      <form className="">
        <div className="form-row">
          <input
            type="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="input"
            required
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            required
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
