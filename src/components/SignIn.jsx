import { useState } from "react";

const SignIn = ({ isOpen, onClose, onSignIn, darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSignIn();
    } catch (err) {
      setError("Invalid email or password");
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
      onSignIn();
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
              ? "Signing in..."
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
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  darkMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
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
