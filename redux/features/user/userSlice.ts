import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userName: string;
}

const initialState: UserState = {
    userName: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        clearUser: (state) => {
            state.userName = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;