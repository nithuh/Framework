import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import -> useNavigate

const Login: React.FC = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize => useNavigate

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        name: name,
        password: password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Redirect to PTCode page upon successful login
        navigate("/ptcode"); // Use navigate to redirect after successful login
      }
    } catch (err) {
      // Handle error (invalid credentials, server error, etc.)
      console.error("Error during login:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect => register page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            <button
              onClick={handleRegister}
              className="text-blue-500 ml-2 hover:underline"
            >
              Register here! :)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
