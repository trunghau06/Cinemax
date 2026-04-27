import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import wishListReducer from "./wishList/wishSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wishList: wishListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;