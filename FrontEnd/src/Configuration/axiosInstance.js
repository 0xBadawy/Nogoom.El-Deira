import axios from "axios";

const axiosInstance = axios.create({
 baseURL: "http://localhost:3000/api/v1",
  //  baseURL: "https://nogoomel-deira.uc.r.appspot.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
  timeout: 5000,
});

export default axiosInstance;
