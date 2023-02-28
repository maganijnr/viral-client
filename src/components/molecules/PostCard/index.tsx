import { useAppSelector } from "../../../store/hooks/app";
import "./index.scss";
import { BsFillTrashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { likePost } from "../../../store/actions/postActions";
import { IPost } from "../../../types";
import { Link } from "react-router-dom";

//@ts-ignore
const PostCard = ({ post, callBack }) => {
	const auth = useAppSelector((state) => state.auth);
	const { user, token } = auth;
	const {
		message,
		creator,
		imageUrl,
		comments,
		likes,
		_id,
		avatar,
	}: IPost = post;

	let hasLiked;
	if (user) {
		hasLiked = likes?.includes(user._id);
	}

	const handleLikePost = async () => {
		if (token) {
			await likePost(_id, token);
			callBack();
		}
	};

	//@ts-ignore
	const profileRoute = `/user-profile/${creator._id}`;
	const accountRoute = `/profile`;

	return (
		<div className="card_body">
			<div className="card_header">
				<Link
					to={
						//@ts-ignore
						user && user?._id === creator._id
							? accountRoute
							: profileRoute
					}
				>
					<div className="user_avatar">
						{/* @ts-ignore */}
						<img src={creator.avatar ?? avatar} alt={creator.username} />
					</div>
				</Link>
				<Link
					to={
						//@ts-ignore
						user && user?._id === creator._id
							? accountRoute
							: profileRoute
					}
				>
					{/* @ts-ignore */}
					<h5>{creator.username}</h5>
				</Link>
			</div>
			<div className="card_top">
				{message && <p>{message}</p>}
				{imageUrl && (
					<div className="card_img">
						<img src={imageUrl} alt="image" />
					</div>
				)}
			</div>
			<div className="card_actions">
				<div className="actions">
					<span>
						{hasLiked ? (
							<BsHeartFill color="red" onClick={handleLikePost} />
						) : (
							<BsHeart onClick={handleLikePost} />
						)}{" "}
						<p>{likes?.length}</p>
					</span>
					<span>
						<FaCommentDots /> <p>{comments?.length}</p>
					</span>
				</div>
				{
					//@ts-ignore
					user && user._id === creator._id && (
						<BsFillTrashFill fontSize={18} color="red" />
					)
				}
			</div>
		</div>
	);
};

export default PostCard;
