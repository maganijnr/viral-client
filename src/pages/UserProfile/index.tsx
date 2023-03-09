import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/atoms/Loader";
import { followUser, userProfile } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { setUserData } from "../../store/reducers/userReducer";
import "./index.scss";
import { ThreeCircles } from "react-loader-spinner";
import PostCard from "../../components/molecules/PostCard";
import { getAllPosts } from "../../store/actions/postActions";
import { fetchAllPosts } from "../../store/reducers/postReducer";

const UserProfile = () => {
	const auth = useAppSelector((state) => state.auth);
	const userInfo = useAppSelector((state) => state.user);
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [followingUser, setFollowingUser] = useState<boolean>(false);
	const [followLoading, setFollowingLoading] = useState<boolean>(false);

	const { user, token } = auth;
	const { userData } = userInfo;

	const handleFollowUser = async () => {
		if (userData.user && token) {
			await followUser(userData.user?._id, token);
			setFollowingLoading(true);
			if (String(id) && token) {
				const data = await userProfile(String(id), token);
				dispatch(setUserData(data));
				setFollowingLoading(false);
			}
		}
	};

	async function getUserProfile() {
		setLoading(true);
		if (String(id) && token) {
			const data = await userProfile(String(id), token);
			dispatch(setUserData(data));
			setLoading(false);
		}
	}

	async function checkUserFollowers() {
		if (user) {
			userData.user?.followers?.includes(user._id)
				? setFollowingUser(true)
				: setFollowingUser(false);
		}
	}

	async function callBack() {
		try {
			const result = await getAllPosts();
			dispatch(fetchAllPosts(result.posts));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserProfile();
	}, [id]);

	useEffect(() => {
		checkUserFollowers();
	}, [userData]);

	return (
		<div className="page_container">
			{loading && <Loader />}
			{!loading && userData && (
				<div className="profile_body">
					<div className="cover_section">
						<div className="cover_photo">
							<img src={userData.user?.coverPhoto} alt="cover photo" />
						</div>
						<div className="user_profile">
							<div className="user_avatar">
								<img src={userData.user?.avatar} alt="avatar" />
							</div>
							<div className="user_details">
								<h2>{userData.user?.username}</h2>
								<p>{userData.user?.followers?.length} Followers</p>
							</div>
							{followLoading ? (
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
							)}
						</div>
					</div>
					<div className="post_section">
						{userData.userPosts &&
							userData.userPosts.map((post) => {
								const dataPost = {
									...post,
									avatar: userData.user?.avatar,
								};
								return (
									<PostCard
										key={post._id}
										post={dataPost}
										callBack={callBack}
									/>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
