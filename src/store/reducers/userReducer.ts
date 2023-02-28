import { IPost, IUser } from "./../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IState {
	userData: {
		user: IUser | null;
		userPosts: IPost[] | null;
	};
}

const initialState: IState = {
	userData: {
		user: null,
		userPosts: null,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.userData.user = action.payload.user;
			state.userData.userPosts = action.payload.userPosts;
		},
	},
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
