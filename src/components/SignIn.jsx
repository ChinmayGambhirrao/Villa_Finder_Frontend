import { useState, useEffect } from "react";
import config from "../config";

const SignIn = ({ isOpen, onClose, onSignIn, darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  // Check if backend is available
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(config.apiUrl);
        if (!response.ok) {
          setIsBackendAvailable(false);
          setError(
            "Backend service is currently unavailable. Please try again in a few minutes."
          );
        } else {
          setIsBackendAvailable(true);
        }
      } catch (err) {
        console.error("Backend check failed:", err);
        setIsBackendAvailable(false);
        setError(
          "Cannot connect to the server. Please try again in a few minutes."
        );
      }
    };

    if (isOpen) {
      checkBackendStatus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isBackendAvailable) {
      setError("Backend service is not available. Please try again later.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint = isSignUp ? "register" : "login";
      const url = `${config.apiUrl}${config.endpoints.users}/${endpoint}`;

      console.log("Making request to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);

        if (response.status === 404) {
          throw new Error(
            "Backend service is starting up. Please try again in a few moments."
          );
        } else if (response.status === 400) {
          throw new Error(errorData || "Invalid email or password format.");
        } else if (response.status === 401) {
          throw new Error(
            "Invalid credentials. Please check your email and password."
          );
        } else {
          throw new Error("Authentication failed. Please try again.");
        }
      }

      const data = await response.json();

      if (!data || !data.token) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("userToken", data.token);
      onSignIn(data);
      onClose();
    } catch (err) {
      console.error("Authentication error:", err);
      setError(
        err.message || "Failed to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Initialize Google Sign-In
      const googleAuth = await window.gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();
      const profile = googleUser.getBasicProfile();

      // Here you would typically send the Google token to your backend
      // For now, we'll just simulate a successful sign-in
      console.log("Google Sign-In successful:", profile.getName());
      onSignIn({
        email: profile.getEmail(),
        name: profile.getName(),
      });
      onClose();
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
      console.error("Google Sign-In error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg p-8 w-full max-w-md shadow-xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-500"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "border-gray-300"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "border-gray-300"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className={`text-sm ${
              darkMode ? "text-blue-400" : "text-blue-600"
            } hover:underline`}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
