import axios from "axios";

interface LoginProps {
	username: string;
	password: string;
}

interface RegisterProps {
	username: string;
	password: string;
	email: string;
}

export const loginUser = async (userData: LoginProps) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/signin`,
			userData,
			config
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

export const registerUser = async (userData: RegisterProps) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
			userData,
			config
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
