import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { message } from "antd";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [actiCode, setActiCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirm) {
      message.info("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password, actiCode);
      message.info(`Welcome ${username}! Please login to access your profile.`);
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      message.info(
        `Sorry, the username "${username}" already exists! Please try another username.`
      );
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Registration
        </h2>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <p className="text-left  text-gray-700 mb-1">Username</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <p className="text-left  text-gray-700 mb-1">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <p className="text-left  text-gray-700 mb-1">Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <p className="text-left  text-gray-700 mb-1">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Activation Code */}
          <div>
            <p className="text-left  text-gray-700 mb-1">Activation Code (optional)</p>
            <input
              type="text"
              placeholder="Secret code for internal staff"
              value={actiCode}
              onChange={(e) => setActiCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login link */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-orange-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
