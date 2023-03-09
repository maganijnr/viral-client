import "./index.scss";
import React, { useEffect, useState, useContext } from "react";
import Loader from "../../components/atoms/Loader";
import { accountProfile } from "../../store/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { setMyProfile } from "../../store/reducers/userReducer";
import { BsPencil } from "react-icons/bs";
import EditProfileModal from "../../components/modals/EditProfileModal";
import PostCard from "../../components/molecules/PostCard";
import { getAllPosts } from "../../store/actions/postActions";
import { fetchAllPosts } from "../../store/reducers/postReducer";

const ProfilePage = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const auth = useAppSelector((state) => state.auth);
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [showModal, setShowModal] = useState(false);

	const { token } = auth;
	const { userProfile } = userInfo;

	function closeModal() {
		setShowModal(false);
	}

	function openModal() {
		setShowModal(true);
	}

	const getMyProfile = async () => {
		setLoading(true);
		if (token) {
			const data = await accountProfile(token);

			dispatch(setMyProfile(data));
			setLoading(false);
		}
	};

	async function callBack() {
		try {
			const result = await getAllPosts();
			dispatch(fetchAllPosts(result.posts));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getMyProfile();
	}, []);

	return (
		<div className="page_container">
			<EditProfileModal
				showModal={showModal}
				closeModal={closeModal}
				title="Edit Profile"
			/>
			{loading && <Loader />}
			{!loading && userInfo && (
				<div className="profile_body">
					<div className="cover_section">
						<div className="cover_photo">
							<img
								src={userProfile.user?.coverPhoto}
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
							{/*@ts-ignore*/}
							<button className="follow_btn_loader" onClick={openModal}>
								Edit Profile
							</button>
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
					<div className="post_section">
						{userProfile.userPosts &&
							userProfile.userPosts.map((post) => {
								const dataPost = {
									...post,
									avatar: userProfile.user?.avatar,
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

export default ProfilePage;
