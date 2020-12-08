require("dotenv").config();
const REACT_APP_API_URL =
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000") + "/api/v1";

export default REACT_APP_API_URL;
