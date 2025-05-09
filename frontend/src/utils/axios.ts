import axios from "axios";
import { baseServerApiUrl } from "../config/api.config";

export const productApi = axios.create({baseURL: baseServerApiUrl + "/product"})

export const categoryApi = axios.create({baseURL: baseServerApiUrl + "/category"})