import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number;
    progress: number;
    genres?: { id: number; name: string }[]; 
    status?: "downloading" | "completed";
}

interface DownloadState {
    movies: Movie[];
}

const initialState: DownloadState = {
    movies: [],
};

const downloadSlice = createSlice({
    name: "download",
    initialState,
    reducers: {
        addDownload: (state, action: PayloadAction<Movie>) => {
            const exists = state.movies.find(m => m.id === action.payload.id);
            if(!exists) state.movies.push(action.payload);
        },

        removeDownload: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(m => m.id !== action.payload);
        },

        updateProgress: (
            state,
            action: PayloadAction<{ id: number; progress: number; status: 'downloading' | 'completed' }>
        ) => {
            const item = state.movies.find(m => m.id === action.payload.id);
            if (item) {
                item.progress = action.payload.progress;
                item.status = action.payload.status;
            }
        },

        setDownloads: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
    },
});

export const { addDownload, removeDownload, updateProgress, setDownloads } = downloadSlice.actions;
export default downloadSlice.reducer;