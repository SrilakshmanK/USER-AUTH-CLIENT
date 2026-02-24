import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      // setAuth({ accessToken: res.data.accessToken, role: res.user.role }); was incorrect
      setAuth({ accessToken: res.data.accessToken, role: res.data.user.role });
      console.log(res.data);
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="">Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="">
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
          onClick={handleLogin}
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
