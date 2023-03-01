import "./index.scss";
import React, { useEffect, useState } from "react";
import Loader from "../../components/atoms/Loader";
import { accountProfile } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { setMyProfile } from "../../store/reducers/userReducer";

const ProfilePage = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const auth = useAppSelector((state) => state.auth);
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const { token } = auth;
	const { userProfile } = userInfo;

	useEffect(() => {
		const getMyProfile = async () => {
			setLoading(true);
			if (token) {
				const data = await accountProfile(token);

				dispatch(setMyProfile(data));
				setLoading(false);
			}
		};
		getMyProfile();
	}, []);

	return (
		<div className="page_container">
			{loading && <Loader />}
			{!loading && userInfo && (
				<div className="profile_body">
					<div className="cover_section">
						<div className="cover_photo">
							<img
								src={
									`https://res.cloudinary.com/dj9ndrcxg/image/upload/v1677266443/f1xyeiaxek3ejucxtfnq.jpg` ??
									userProfile.user?.coverPhoto
								}
								alt="cover photo"
							/>
						</div>
						<div className="user_profile">
							<div className="user_avatar">
								<img src={userProfile.user?.avatar} alt="avatar" />
							</div>
							<div className="user_details">
								<h2>{userProfile.user?.username}</h2>
								<p>{userProfile.user?.followers?.length} Followers</p>
							</div>
							{/* {followLoading ? (
								<button
									className="follow_btn_loader"
									onClick={handleFollowUser}
								>
									<ThreeCircles width={15} height={15} color="#FFF" />
								</button>
							) : (
								<button
									className="follow_btn"
									onClick={handleFollowUser}
								>
									{followingUser ? "Unfollow" : "Follow"}
								</button>
							)} */}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
