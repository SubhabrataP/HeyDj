import axios from "axios";
import { baseUrlDev } from "../APIurl/UrlList"

export const apiAxios = axios.create({
  baseURL: baseUrlDev,
});
