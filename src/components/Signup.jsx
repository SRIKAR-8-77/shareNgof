import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import signup from "../assets/images/signup-image.png";

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://sharengob.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: fullName, email, password })
    });

    let result = {};
    try {
      result = await response.json();
    } catch (err) {
      console.warn("No JSON body in response");
    }

    if (response.ok && result.message === "User registered successfully") {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(result.message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex h-screen">
      {/* Left Form Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-20">
        <h2 className="text-3xl font-bold mb-4 text-black">Create Account</h2>
        <p className="mb-6 text-gray-600">Join ShareNgo today</p>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded border border-gray-300 text-black"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded border border-gray-300 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded border border-gray-300 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-yellow-500 text-black p-3 rounded hover:bg-yellow-600 font-semibold">
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <p className="text-gray-600 text-sm mb-2">Or sign up with</p>
          <div className="flex gap-4">
            <button className="bg-white p-2 rounded-full shadow hover:scale-105">
              <FcGoogle size={24} />
            </button>
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 hover:scale-105">
              <FaFacebookF size={20} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Right Image Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img src={signup} alt="Signup Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default Signup;
