import axios from "axios";


export const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
  timeout: 30000,
  withCredentials: true
});
