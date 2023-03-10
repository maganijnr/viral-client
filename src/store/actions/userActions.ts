import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

interface UpdateProps {
	avatar?: string;
	coverPhoto?: string;
	username?: string;
	email?: string;
}

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

export const updateUser = async (userData: UpdateProps, token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		axios.defaults.headers.common["Content-Type"] = "application/json";
	}

	try {
		const response = await axios.patch(
			`${baseUrl}/api/profile-update`,
			userData
		);

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

export const uploadAvatarImage = async (image: any) => {
	try {
		const result = await axios.post(`${baseUrl}/api/upload-avatar`, {
			image: image,
		});
		return result.data;
	} catch (error) {
		console.log(error);
	}
};

export const uploadCoverImage = async (image: any) => {
	try {
		const result = await axios.post(`${baseUrl}/api/upload-cover-photo`, {
			image: image,
		});
		return result.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUsers = async (token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	try {
		const results = await axios.get(`${baseUrl}/api/users`);

		return results.data;
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
