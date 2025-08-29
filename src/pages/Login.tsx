import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import GoogleAuth from "../components/GoogleAuth";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
      if (localStorage.getItem("user")) navigate("/profile");
      window.location.reload();
    } catch (err: any) {
      message.info(
        `Sorry ${username}, you may not have an account in our system yet. Please try again or register first.`
      );
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsShow(true)}
        className="flex items-center px-4 py-2 bg-transparent border-0"
      >
        <Avatar className="bg-fire-bush-500 hover:bg-fire-bush-400" icon={<UserOutlined />} />
      </button>

      {/* Modal */}
      {isShow && (
        <> {/* Gray background layer */}
        <div
          className="fixed inset-0 bg-gray-800/50 z-40 !m-0"
        /><div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            {/* Close button */}
            <button
              onClick={() => setIsShow(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Log in Pet Shelter
            </h2>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <p className="text-left text-gray-700 mb-1">Username</p>
                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
                  {/* User icon using SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full outline-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <p className="text-left text-gray-700 mb-1">Password</p>
                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500">
                  {/* Lock icon using SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 8V6a5 5 0 1110 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h1zm2-2v2h6V6a3 3 0 00-6 0z"
                      clipRule="evenodd" />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none" />
                </div>
              </div>

              {/* Remember & forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded" />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-orange-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              {/* Register link */}
              <p className="text-center text-gray-500">
                Don’t have an account?{" "}
                <a href="/register" className="text-orange-500 hover:underline">
                  Register now!
                </a>
              </p>

              {/* Divider */}
              <div className="flex items-center my-2">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-400">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google Auth */}
              <GoogleAuth />
            </div>
          </div>
        </div></>
      )}
    </>
  );
};

export default Login;
