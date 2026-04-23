import axios from "axios";

const TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

export const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";