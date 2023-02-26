import { ReactNode } from "react";
interface IProps {
	children?: ReactNode;
}

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/app";

const ProtectedRoute = ({ children }: IProps) => {
	const auth = useAppSelector((state) => state.auth);

	if (!auth.user) {
		return <Navigate to="/sign-in" />;
	}

	return children;
};

export default ProtectedRoute;
