import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import wishListReducer from "./features/wishList/wishSlice";
import downloadReducer from "./features/download/downloadSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wishList: wishListReducer,
        download: downloadReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;