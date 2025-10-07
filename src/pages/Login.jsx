import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api";
import { jwtDecode } from "jwt-decode";
function Login() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${baseUrl}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      const decoded = jwtDecode(res.data.token);
      localStorage.setItem("userId", decoded._id);

      if (decoded.role === "admin") navigate("/admin");
      else if (decoded.role === "instructor") navigate("/instructor");
      else navigate("/student");
    } catch (err) {
      setError("invalid credendials");
    }
  };

  return (
    <div>
      <nav
        className="bg-gradient-to-r from-indigo-400 
      via-slate-400 to-indigo-400 p-3 text-white flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">EduTech</div>
        </div>
      </nav>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Glassmorphism Card */}
        <div
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 
      rounded-2xl shadow-2xl w-full max-w-md text-white"
        >
          <h2
            className="text-3xl font-bold mb-6 text-center bg-gradient-to-r 
          from-indigo-400 to-pink-400 bg-clip-text text-transparent"
          >
            Welcome Back !
          </h2>{" "}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:border-indigo-400"
                placeholder="example@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/70 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:border-indigo-400"
                placeholder="********"
              />
            </div>
            {error && <p className="text-red-500"> {error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md font-semibold mt-4"
            >
              Login
            </button>
          </form>
          {/* Register Link */}
          <p className="text-sm text-center mt-4 text-white/70">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
