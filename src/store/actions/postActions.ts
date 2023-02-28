import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

export const getAllPosts = async () => {
	try {
		const response = await axios.get(`${baseUrl}/api/posts`);

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

export const likePost = async (postId: string, token: string) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}

	try {
		const response = await axios.post(`${baseUrl}/api/posts/like/${postId}`);

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

export const uploadPostImage = async (image: any) => {
	try {
		const result = await axios.post(`${baseUrl}/api/upload-post`, {
			image: image,
		});
		return result.data;
	} catch (error) {
		console.log(error);
	}
};

export const uploadPost = async (
	message: string,
	imageUrl: string,
	token: string
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	};

	const formData = {
		message,
		imageUrl,
	};

	try {
		const response = await axios.post(
			`${baseUrl}/api/posts`,
			formData,
			config
		);
	} catch (error) {
		console.log(error);
	}
};
