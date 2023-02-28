import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/app";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../store/actions/postActions";
import { fetchAllPosts } from "../../store/reducers/postReducer";
import Loader from "../../components/atoms/Loader";
import PostCard from "../../components/molecules/PostCard";

const HomePage = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const data = useAppSelector((state) => state.posts);

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
						{" "}
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
						<h2>Home</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
