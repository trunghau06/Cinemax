import { RootState } from "../store";

export const selectUserName = (state: RootState) => state.user.userName;