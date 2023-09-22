import config from "@shared/config";
import axios from "axios";

const { baseURL } = config.gateway;
const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
});

export default axiosInstance;
