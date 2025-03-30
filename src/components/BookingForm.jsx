import { useState, useEffect } from "react";

const BookingForm = ({ villa, isOpen, onClose, onSuccess, darkMode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
    duration: "1",
    paymentMethod: "credit",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && villa) {
      console.log("BookingForm opened for villa:", villa.name);
    }
  }, [isOpen, villa]);

  if (!isOpen || !villa) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.cardExpiry.trim())
        newErrors.cardExpiry = "Expiry date is required";
      if (!formData.cardCVC.trim()) newErrors.cardCVC = "CVC is required";
    }
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        onSuccess({
          ...formData,
          villa: villa,
          totalPrice: villa.price * parseInt(formData.duration),
          bookingId: "BK" + Math.floor(Math.random() * 10000000),
          bookingDate: new Date().toISOString(),
        });
        onClose();
      } catch (error) {
        console.error("Booking error:", error);
        setErrors({ submit: "There was a problem processing your booking." });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTotal = () => {
    const total = villa.price * parseInt(formData.duration);
    return total.toLocaleString();
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
          className={`inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6`}
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

          <div className="mb-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Book Your Stay at {villa.name}
            </h2>
            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {villa.location} • ₹{Number(villa.price).toLocaleString()}/month
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex justify-center">
                <span
                  className={`px-2 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          step >= 1
                            ? "bg-blue-600 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        1
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          step >= 1
                            ? "text-blue-600"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        Personal Info
                      </span>
                    </div>
                    <div
                      className={`w-12 h-0.5 ${
                        darkMode ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          step >= 2
                            ? "bg-blue-600 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        2
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          step >= 2
                            ? "text-blue-600"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        Payment
                      </span>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.firstName
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.lastName
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-1`}
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone
                        ? "border-red-500"
                        : darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                      htmlFor="startDate"
                    >
                      Move-in Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.startDate
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}
                      htmlFor="duration"
                    >
                      Duration (Months)
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.duration
                          ? "border-red-500"
                          : darkMode
                          ? "border-gray-600 bg-gray-700 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {[1, 2, 3, 6, 12, 24].map((months) => (
                        <option key={months} value={months}>
                          {months} {months === 1 ? "month" : "months"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Payment Method
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div
                      className={`flex items-center p-4 border rounded-md ${
                        darkMode
                          ? "border-gray-600 bg-gray-700"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        value="credit"
                        checked={formData.paymentMethod === "credit"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="credit"
                        className={`ml-3 block ${
                          darkMode ? "text-white" : "text-gray-700"
                        }`}
                      >
                        <span className="block font-medium">
                          Credit or Debit Card
                        </span>
                        <span
                          className={`block text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Secure payment via credit card
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Booking Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property</span>
                      <span className="font-medium">{villa.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span>{villa.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span>
                        {formData.duration}{" "}
                        {parseInt(formData.duration) === 1 ? "month" : "months"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rate</span>
                      <span>₹{villa.price.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{formatTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="agreeTerms"
                        className="font-medium text-gray-700"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                      {errors.agreeTerms && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {errors.submit}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step === 1 ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Processing...
                    </div>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
