import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genres?: { id: number; name: string }[];
}

interface WishState {
    movies: Movie[];
}

const initialState: WishState = {
    movies: [],
};

const wishSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addWishList: (state, action: PayloadAction<Movie>) => {
            const exists = state.movies.find(m => m.id === action.payload.id);
            if (!exists) state.movies.push(action.payload);
        },
        removeWishList: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(m => m.id !== action.payload);
        },
        setWishList: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
    },
});

export const { addWishList, removeWishList, setWishList } = wishSlice.actions;
export default wishSlice.reducer;