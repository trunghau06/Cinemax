import axios from "axios";

export const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmNmYTM4MTk3YWMxMDliZjBhYjhlNjMzYjU0ZDkwNiIsIm5iZiI6MTc3MjUyMzEzOS42ODksInN1YiI6IjY5YTY4ZTgzNzQ5Yjg1YTNkNzI4YjVjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5K0iJkdaXe4Cp7EiOaAIQ27B_raWkWeBd3d_V4MVTUI";

export const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";