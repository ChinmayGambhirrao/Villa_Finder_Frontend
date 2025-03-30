import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SignIn from "./SignIn";
import VillaDetails from "./VillaDetails";
import BookingForm from "./BookingForm";

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
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [searchFilters, setSearchFilters] = useState(filters);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const fetchVillas = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (searchFilters.location)
        queryParams.append("location", searchFilters.location);
      if (searchFilters.minPrice)
        queryParams.append("minPrice", searchFilters.minPrice);
      if (searchFilters.maxPrice)
        queryParams.append("maxPrice", searchFilters.maxPrice);

      const response = await axios.get(
        `http://localhost:5001/api/villas?${queryParams}`
      );
      setVillas(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch villas");
      console.error("Error fetching villas:", err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [searchFilters]);

  useEffect(() => {
    fetchVillas();
  }, [fetchVillas]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setSearchFilters(filters);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
        <div className="flex flex-col md:flex-row gap-4">
          <div>
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
                    darkMode ? "text-gray-500" : "text-gray-400"
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
                value={filters.location}
                onChange={handleFilterChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-10 px-4 py-2 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Mumbai, Delhi, Goa..."
              />
            </div>
          </div>
          <div>
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
                  className={`${darkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  ₹
                </span>
              </div>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-10 px-4 py-2 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Minimum budget"
              />
            </div>
          </div>
          <div>
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
                  className={`${darkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  ₹
                </span>
              </div>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-10 px-4 py-2 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "border-gray-300 placeholder-gray-500"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Maximum budget"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Villas
            </div>
          </button>
        </div>
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
                luxury villas {filters.location && `in ${filters.location}`}
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
