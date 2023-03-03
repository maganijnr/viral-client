import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

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
			`${baseUrl}/api/signin`,
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
			`${baseUrl}/api/signup`,
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

export const logoutUser = async () => {
	if (
		localStorage.getItem("viralUser") &&
		localStorage.getItem("viralToken")
	) {
		localStorage.removeItem("viralUser");
		localStorage.removeItem("viralToken");
	}
};
