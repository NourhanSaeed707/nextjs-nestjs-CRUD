import axios from "axios";

// const token = localStorage.getItem("authToken");
const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Origin": "http://localhost:8080",
    // Authorization: "XXXX",
  },
  // timeout: 1000 * 60,
});

export default client;
