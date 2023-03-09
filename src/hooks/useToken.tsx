import { useAppSelector } from "../store/hooks/app";
import { useJwt } from "react-jwt";

const useToken = () => {
	const auth = useAppSelector((state) => state.auth);
	const { token } = auth;

	const hasTokenExpired = () => {
		if (token) {
			const { decodedToken, isExpired } = useJwt(token);

			if (isExpired) {
				return true;
			} else {
				return false;
			}
		} else {
			return "No token found";
		}
	};
	return { hasTokenExpired };
};

export default useToken;
