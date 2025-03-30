import { useState } from "react";

const VillaDetails = ({ villa, isOpen, onClose, onBookNow, darkMode }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen || !villa) return null;

  const amenityIcons = {
    "Swimming Pool": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
        ></path>
      </svg>
    ),
    Garden: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.5 7.5l6.5-3.25L17.5 7.5"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 22.5c4.142 0 7.5-4.813 7.5-10S16.142 2.5 12 2.5 4.5 7.313 4.5 12.5s3.358 10 7.5 10z"
        ></path>
      </svg>
    ),
    Security: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        ></path>
      </svg>
    ),
    Parking: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    Gym: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        ></path>
      </svg>
    ),
  };

  const defaultIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );

  const getAmenityIcon = (amenity) => {
    return amenityIcons[amenity] || defaultIcon;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div
          className={`inline-block w-full max-w-5xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button
            className={`absolute top-3 right-3 ${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div className="overflow-hidden rounded-lg mb-6">
            <img
              src={villa.image}
              alt={villa.name}
              className="w-full h-80 object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x400?text=No+Image";
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-2/3">
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {villa.name}
              </h2>
              <div className="flex items-center mt-2 mb-4">
                <svg
                  className={`h-5 w-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
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
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {villa.location}
                </span>
              </div>

              <div
                className={`mb-6 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
                      activeTab === "overview"
                        ? "border-blue-600 text-blue-600"
                        : `border-transparent ${
                            darkMode
                              ? "text-gray-400 hover:text-gray-300 hover:border-gray-600"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
                      activeTab === "amenities"
                        ? "border-blue-600 text-blue-600"
                        : `border-transparent ${
                            darkMode
                              ? "text-gray-400 hover:text-gray-300 hover:border-gray-600"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`
                    }`}
                    onClick={() => setActiveTab("amenities")}
                  >
                    Amenities
                  </button>
                  <button
                    className={`px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${
                      activeTab === "location"
                        ? "border-blue-600 text-blue-600"
                        : `border-transparent ${
                            darkMode
                              ? "text-gray-400 hover:text-gray-300 hover:border-gray-600"
                              : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`
                    }`}
                    onClick={() => setActiveTab("location")}
                  >
                    Location
                  </button>
                </div>
              </div>

              {activeTab === "overview" && (
                <div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-4`}
                  >
                    This beautiful {villa.bedrooms} bedroom villa is located in
                    the prestigious area of {villa.location}. With{" "}
                    {villa.bathrooms} bathrooms and a range of luxury amenities,
                    this property is perfect for those seeking comfort and
                    elegance in a premier location.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <svg
                        className={`h-5 w-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        } mr-2`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {villa.bedrooms} Bedrooms
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className={`h-5 w-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        } mr-2`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {villa.bathrooms} Bathrooms
                      </span>
                    </div>
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {villa.description ||
                      "This magnificent property offers a blend of traditional and modern design, creating a comfortable living space. The villa features a spacious layout with elegant interiors, complemented by luxurious amenities to make your stay extraordinary."}
                  </p>
                </div>
              )}

              {activeTab === "amenities" && (
                <div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-4`}
                  >
                    This villa comes with a range of premium amenities for your
                    comfort and convenience.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {villa.amenities &&
                      villa.amenities.map((amenity, index) => (
                        <div
                          className={`flex items-center px-3 py-2 rounded-md ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                          key={index}
                        >
                          <div
                            className={`mr-3 ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {getAmenityIcon(amenity)}
                          </div>
                          <span
                            className={`${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {amenity}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-4`}
                  >
                    Situated in {villa.location}, this property enjoys a prime
                    position with excellent connectivity and access to local
                    amenities.
                  </p>
                  <div
                    className={`p-4 rounded-md mb-4 ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Neighborhood
                    </h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      The surrounding area offers a perfect blend of convenience
                      and tranquility. Local attractions include parks, premium
                      dining options, and shopping centers.
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-md ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Transportation
                    </h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Well-connected by public transportation and easily
                      accessible from major highways, making commuting a breeze.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`md:w-1/3 ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              } p-6 rounded-lg`}
            >
              <div className="mb-4">
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-2`}
                >
                  Price
                </h3>
                <div className="flex items-baseline">
                  <span
                    className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    ₹{Number(villa.price).toLocaleString()}
                  </span>
                  <span
                    className={`ml-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    /month
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => onBookNow(villa)}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Book Now
                </button>
                <button
                  className={`w-full py-3 px-4 border ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  Request a Visit
                </button>
              </div>
              <div
                className={`mt-6 pt-6 border-t ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Interested in this property?
                </p>
                <a
                  href="#"
                  className={`inline-flex items-center text-sm ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } hover:underline`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
