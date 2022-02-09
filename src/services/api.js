import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  auth: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "pt-BR",
  },
});
