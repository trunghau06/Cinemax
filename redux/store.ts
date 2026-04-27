import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import wishListReducer from "./wishList/wishSlice";
import downloadReducer from "./download/downloadSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wishList: wishListReducer,
        download: downloadReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;