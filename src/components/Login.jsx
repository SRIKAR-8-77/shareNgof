import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import login1 from "../assets/images/login-image.png";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Get login method from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://sharengob.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // Parse JSON once

      if (!response.ok) {
        // Show backend error message if any
        alert(result.message || "Login failed");
        return;
      }

      // On success, backend sends { message, user }
      login(result.user); // Save user data in context/localStorage

      alert(result.message || "Login successful!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Side */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <img src={login1} alt="Login Visual" className="w-3/4" />
      </div>

      {/* Right Form Side */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h2 className="text-3xl font-bold mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold transition"
          >
            Log In
          </button>
        </form>

        {/* Social logins (static icons) */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex justify-center space-x-4">
          <FcGoogle className="text-2xl cursor-pointer" />
          <FaFacebookF className="text-2xl text-blue-600 cursor-pointer" />
        </div>

        <p className="mt-6 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-yellow-500 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

