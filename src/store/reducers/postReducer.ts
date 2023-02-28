import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPost } from "../../types";

interface IState {
	posts: IPost[];
}
const initialState: IState = {
	posts: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchAllPosts: (state, action) => {
			state.posts = [...action.payload];
		},
	},
});

export const { fetchAllPosts } = postSlice.actions;

export default postSlice.reducer;
