import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const someApi = axios.create({
  baseURL: process.env.BASE_URL_SOME_API,
});
