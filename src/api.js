import axios from "axios";

const API_URL = "https://villa-finder-backend.onrender.com"; // Our backend url

// Function to get villas from backend
export const getVillas = async () => {
  try {
    const response = await axios.get(`${API_URL}/villas`);
    return response.data;
  } catch (err) {
    console.err("Error fetching villas: ", err);
  }
};
