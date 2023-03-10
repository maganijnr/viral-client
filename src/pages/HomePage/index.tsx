import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../store/actions/postActions";
import { fetchAllPosts } from "../../store/reducers/postReducer";
import Loader from "../../components/atoms/Loader";
import PostCard from "../../components/molecules/PostCard";
import { ThreeCircles } from "react-loader-spinner";
import { IUser } from "../../types";
import { getUsers } from "../../store/actions/userActions";
import UserListItem from "../../components/atoms/UserListItem";

const HomePage = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const data = useAppSelector((state) => state.posts);
	const auth = useAppSelector((state) => state.auth);
	const [usersLoading, setUsersLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<IUser[]>([]);

	const { token } = auth;

	async function homePosts() {
		setLoading(true);
		try {
			const result = await getAllPosts();
			dispatch(fetchAllPosts(result.posts));
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	async function getFollowUsers() {
		setUsersLoading(true);
		try {
			//@ts-ignore
			const result = await getUsers(token);

			//@ts-ignore
			setUsers(result.users);
			setUsersLoading(false);
		} catch (error) {
			console.log(error);
			setUsersLoading(false);
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
		homePosts();
		getFollowUsers();
	}, []);

	return (
		<div className="page_container">
			{loading && <Loader />}
			{!loading && data.posts && (
				<div className="home_container">
					<div className="post_section">
						{data.posts.map((post) => (
							<PostCard key={post._id} post={post} callBack={callBack} />
						))}
					</div>
					<div className="info_section">
						{usersLoading && (
							<div className="info_loader">
								<ThreeCircles color="#fff" width={20} height={20} />
							</div>
						)}

						{!usersLoading && users && (
							<div>
								{users.map((user: IUser) => (
									<UserListItem key={user._id} user={user} />
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
