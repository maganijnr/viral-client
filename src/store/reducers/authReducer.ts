import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUser } from "../../types";

interface IProps {
	user: IUser | null;
	token: string | null;
}

const initialState: IProps = {
	user: localStorage.getItem("viralUser")
		? //@ts-ignore
		  JSON.parse(localStorage.getItem("viralUser"))
		: null,
	token: localStorage.getItem("viralToken")
		? //@ts-ignore
		  JSON.parse(localStorage.getItem("viralToken"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			localStorage.setItem("viralUser", JSON.stringify(action.payload.user));
			localStorage.setItem(
				"viralToken",
				JSON.stringify(action.payload.token)
			);
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
