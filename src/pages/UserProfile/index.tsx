import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userProfile } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { setUserData } from "../../store/reducers/userReducer";

const UserProfile = () => {
	const auth = useAppSelector((state) => state.auth);
	const userInfo = useAppSelector((state) => state.user);
	const { token } = auth;
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const { userData } = userInfo;
	console.log(userData);

	useEffect(() => {
		async function getUserProfile() {
			if (String(id) && token) {
				const data = await userProfile(String(id), token);
				dispatch(setUserData(data));
			}
		}

		getUserProfile();
	}, [id]);
	return (
		<div className="page_container">
			<h2>UserProfile</h2>
		</div>
	);
};

export default UserProfile;
