import { useState, useEffect } from "react";
import VillaList from "./components/VillaList";
import SignIn from "./components/SignIn";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleSignIn = (userData) => {
    console.log(
      "User signed in:",
      userData.email,
      "Pending booking:",
      pendingBooking
    );
    setUser(userData);
    setIsLoggedIn(true);
    setIsSignInOpen(false);
    // We'll let the VillaList effect handle opening the booking form
  };

  const handleSignInClick = (forBooking = false) => {
    console.log("Sign-in clicked, for booking:", forBooking);
    setPendingBooking(forBooking);
    setIsSignInOpen(true);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "dark bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        } shadow-md z-30`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-blue-600"
                }`}
              >
                <span className={darkMode ? "text-blue-400" : "text-blue-800"}>
                  Villa
                </span>
                Finder
              </h1>
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
              <a
                href="#"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                } font-medium`}
              >
                Home
              </a>
              <a
                href="#listings"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                } font-medium`}
              >
                Explore
              </a>
              <a
                href="#about"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                } font-medium`}
              >
                About
              </a>
              <a
                href="#contact"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                } font-medium`}
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            {!isLoggedIn ? (
              <button
                onClick={() => handleSignInClick(false)}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-lg transition duration-200`}
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center">
                <span
                  className={`mr-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Welcome, {user.email}
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUser(null);
                  }}
                  className={`px-4 py-2 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  } rounded-lg hover:bg-gray-300 transition duration-200`}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={
          darkMode
            ? "bg-gray-800 text-white py-16"
            : "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
        }
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Villa in India
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover luxurious villas across India's most beautiful cities.
              Exclusive properties with premium amenities for the perfect stay.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document
                    .querySelector("main")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className={`${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                } px-6 py-3 rounded-lg font-medium transition duration-200`}
              >
                Explore Properties
              </button>
              <a
                href="#about"
                className={`inline-flex items-center justify-center ${
                  darkMode
                    ? "border-2 border-blue-400 text-blue-400"
                    : "border-2 border-white text-white"
                } px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition duration-200`}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8" id="listings">
        <VillaList
          isLoggedIn={isLoggedIn}
          onSignInClick={(forBooking) => handleSignInClick(forBooking)}
          pendingBooking={pendingBooking}
          setPendingBooking={setPendingBooking}
          darkMode={darkMode}
        />
      </main>

      {/* About Section */}
      <section
        id="about"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              About VillaFinder
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover the finest luxury villas and premium properties across
              India's most sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                Premium Properties
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                We handpick only the finest luxury villas and premium properties
                that meet our rigorous quality standards.
              </p>
            </div>

            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                Prime Locations
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                From Mumbai's bustling suburbs to serene beachfronts in Goa, we
                offer properties in India's most coveted locations.
              </p>
            </div>

            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <div className="text-blue-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                Transparent Pricing
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                We believe in complete transparency with no hidden fees or
                charges, ensuring you know exactly what you're paying for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${
          darkMode ? "bg-gray-900" : "bg-gray-800"
        } text-white pt-12 pb-6`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VillaFinder</h3>
              <p className="text-gray-400 mb-4">
                Connecting you with premium villas and luxury properties across
                India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Explore Villas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Mumbai
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Delhi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Bangalore
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Goa
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Chennai
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">123 Property Lane, Mumbai</p>
              <p className="text-gray-400 mb-2">info@villafinder.com</p>
              <p className="text-gray-400 mb-4">+91 123 456 7890</p>
              <form id="contact">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? "bg-gray-700 text-white" : ""
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>© 2025 VillaFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => {
          setIsSignInOpen(false);
          setPendingBooking(false);
        }}
        onSignIn={handleSignIn}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
