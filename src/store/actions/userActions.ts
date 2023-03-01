import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

export const userProfile = async (userId: string, token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	try {
		const response = await axios.get(`${baseUrl}/api/profile/${userId}`);

		return response.data;
	} catch (error) {
		//@ts-ignore
		const msg =
			//@ts-ignore
			(error.response &&
				//@ts-ignore
				error.response.data &&
				//@ts-ignore
				error.response.data.message) ||
			//@ts-ignore
			error.message ||
			//@ts-ignore
			error.toString();

		return { error: msg };
	}
};

export const followUser = async (userId: string, token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	try {
		const response = await axios.post(`${baseUrl}/api/follow-user/${userId}`);

		return response.data;
	} catch (error) {
		//@ts-ignore
		const msg =
			//@ts-ignore
			(error.response &&
				//@ts-ignore
				error.response.data &&
				//@ts-ignore
				error.response.data.message) ||
			//@ts-ignore
			error.message ||
			//@ts-ignore
			error.toString();

		return { error: msg };
	}
};

export const accountProfile = async (token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	try {
		const response = await axios.get(`${baseUrl}/api/profile-me`);

		return response.data;
	} catch (error) {
		//@ts-ignore
		const msg =
			//@ts-ignore
			(error.response &&
				//@ts-ignore
				error.response.data &&
				//@ts-ignore
				error.response.data.message) ||
			//@ts-ignore
			error.message ||
			//@ts-ignore
			error.toString();

		return { error: msg };
	}
};
