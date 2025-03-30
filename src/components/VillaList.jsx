import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SignIn from "./SignIn";
import VillaDetails from "./VillaDetails";
import BookingForm from "./BookingForm";
import config from "../config";

const VillaList = ({
  isLoggedIn,
  onSignInClick,
  pendingBooking,
  setPendingBooking,
  darkMode,
}) => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const fetchVillas = async () => {
    setError("");
    setInitialLoad(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/villas`);
      if (!response.ok) {
        throw new Error("Failed to fetch villas");
      }
      const data = await response.json();
      setVillas(data);
    } catch (error) {
      console.error("Error fetching villas:", error);
      setError("Failed to fetch villas. Please try again later.");
    } finally {
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const queryParams = new URLSearchParams();
      if (searchFilters.location) {
        queryParams.append("location", searchFilters.location);
      }
      if (searchFilters.minPrice) {
        queryParams.append("minPrice", searchFilters.minPrice);
      }
      if (searchFilters.maxPrice) {
        queryParams.append("maxPrice", searchFilters.maxPrice);
      }

      const response = await fetch(
        `${config.apiUrl}/api/villas?${queryParams}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch villas");
      }
      const data = await response.json();
      setVillas(data);
    } catch (error) {
      console.error("Error fetching villas:", error);
      setError("Failed to fetch villas. Please try again later.");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const handleSignIn = () => {
    onSignInClick();
    setIsSignInOpen(false);
  };

  const handleViewDetails = (villa) => {
    setSelectedVilla(villa);
    setIsDetailsOpen(true);
  };

  const handleBookNow = (villa) => {
    console.log("Booking now for villa:", villa.name);
    setSelectedVilla(villa);
    if (!isLoggedIn) {
      console.log("Not logged in, redirecting to sign-in");
      onSignInClick(true); // Indicate this is for booking
    } else {
      console.log("User is logged in, opening booking form");
      setIsBookingOpen(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingBooking && selectedVilla) {
      console.log(
        "User just logged in with pending booking, opening booking form"
      );
      setIsBookingOpen(true);
      setPendingBooking(false);
    }
  }, [isLoggedIn, pendingBooking, selectedVilla, setPendingBooking]);

  const handleBookingSuccess = (bookingData) => {
    setBookingConfirmed(bookingData);
    setIsBookingOpen(false);

    // Show booking confirmation alert
    setTimeout(() => {
      alert(`Booking confirmed! Your booking ID is ${bookingData.bookingId}`);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className={`mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-lg p-6`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Find Your Dream Villa
        </h2>
        <form
          onSubmit={handleSearch}
          className="space-y-4 md:space-y-0 md:flex md:gap-4"
        >
          <div className="flex-1">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="location"
                value={searchFilters.location}
                onChange={handleFilterChange}
                placeholder="Mumbai, Delhi, Goa..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Min Price (₹)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span
                  className={`text-lg ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ₹
                </span>
              </div>
              <input
                type="number"
                name="minPrice"
                value={searchFilters.minPrice}
                onChange={handleFilterChange}
                placeholder="Minimum budget"
                min="0"
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } mb-1`}
            >
              Max Price (₹)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span
                  className={`text-lg ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ₹
                </span>
              </div>
              <input
                type="number"
                name="maxPrice"
                value={searchFilters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Maximum budget"
                min="0"
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                }`}
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search Villas
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Status Messages */}
      {initialLoad ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Loading premium villas...
          </p>
        </div>
      ) : loading ? (
        <div
          className={`fixed top-4 right-4 ${
            darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
          } px-4 py-2 rounded-md shadow-md z-50`}
        >
          <div className="flex items-center">
            <div
              className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                darkMode ? "border-blue-300" : "border-blue-700"
              } mr-2`}
            ></div>
            <span>Searching...</span>
          </div>
        </div>
      ) : null}

      {/* Error Message */}
      {error && !loading && (
        <div
          className={`${
            darkMode
              ? "bg-red-900 border-red-700 text-red-300"
              : "bg-red-100 border-red-500 text-red-700"
          } border-l-4 p-4 rounded-md shadow-md mb-8`}
        >
          <div className="flex items-center">
            <svg
              className={`h-6 w-6 ${
                darkMode ? "text-red-400" : "text-red-500"
              } mr-2`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Result Summary */}
      {!initialLoad && !loading && (
        <div className="mb-8">
          <h2 className="text-xl text-gray-700 font-semibold">
            {villas.length > 0 ? (
              <>
                Found{" "}
                <span className="text-blue-600 font-bold">{villas.length}</span>{" "}
                luxury villas{" "}
                {searchFilters.location && `in ${searchFilters.location}`}
              </>
            ) : (
              "No villas match your search criteria"
            )}
          </h2>
        </div>
      )}

      {/* Results Count */}
      {!initialLoad && !loading && !error && (
        <div className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Found <span className="font-semibold">{villas.length}</span> villas
          matching your criteria
        </div>
      )}

      {/* No Results */}
      {!initialLoad && !loading && !error && villas.length === 0 && (
        <div
          className={`text-center py-12 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <svg
            className={`h-16 w-16 mx-auto mb-4 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            No villas found
          </h3>
          <p
            className={`max-w-md mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Try adjusting your search filters or exploring different locations
            to find more options.
          </p>
        </div>
      )}

      {/* Villa Grid */}
      {!initialLoad && !error && Array.isArray(villas) && villas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map(
            (villa) =>
              villa && (
                <div
                  key={villa.id || Math.random()}
                  className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={
                        villa.image ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={villa.name || "Villa"}
                      className="w-full h-56 object-cover"
                    />
                    {villa.premium && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                        Premium
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {villa.name || "Unnamed Villa"}
                      </h3>
                      <div
                        className={`text-xl font-bold ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        ₹
                        {villa.price
                          ? Number(villa.price).toLocaleString()
                          : "Price on request"}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <svg
                        className={`h-5 w-5 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        } mr-1`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {villa.location || "Location not specified"}
                      </span>
                    </div>
                    <p
                      className={`mb-4 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {villa.description
                        ? villa.description.length > 120
                          ? `${villa.description.substring(0, 120)}...`
                          : villa.description
                        : "No description available"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(villa.amenities) &&
                        villa.amenities.slice(0, 4).map((amenity, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {amenity}
                          </span>
                        ))}
                      {Array.isArray(villa.amenities) &&
                        villa.amenities.length > 4 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            +{villa.amenities.length - 4} more
                          </span>
                        )}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDetails(villa)}
                        className={`flex-1 px-4 py-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleBookNow(villa)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
      />

      {/* Villa Details Modal */}
      {selectedVilla && (
        <VillaDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          villa={selectedVilla}
          onBookNow={handleBookNow}
          darkMode={darkMode}
        />
      )}

      {/* Booking Form Modal */}
      {selectedVilla && (
        <BookingForm
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          villa={selectedVilla}
          onBookingSuccess={handleBookingSuccess}
          darkMode={darkMode}
        />
      )}

      {bookingConfirmed && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg max-w-md animate-fade-in-up">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Booking Confirmed! ID: {bookingConfirmed.bookingId}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setBookingConfirmed(null)}
                  className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">
          {loading
            ? "Searching for villas..."
            : `${villas.length} Villas Available`}
        </h3>
      </div>
    </div>
  );
};

export default VillaList;
