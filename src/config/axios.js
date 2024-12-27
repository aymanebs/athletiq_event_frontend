import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL || "http://localhost:3000",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("acces_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message || "An unexpected error occurred.";
      switch (status) {
        case 400:
          toast.error("Bad request. Please check your input.");
          break;
        case 401:
          toast.error("Unauthorized. Please log in again.");
          break;
        case 403:
          toast.error("Forbidden. You do not have access.");
          break;
        case 404:
          toast.error("Not found. The requested resource does not exist.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(message); 
          break;
      }
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error(`Unexpected error: ${error.message}`);
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
