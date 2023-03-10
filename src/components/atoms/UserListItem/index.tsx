import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { followUser, userProfile } from "../../../store/actions/userActions";
import { useAppSelector } from "../../../store/hooks/app";
import { IUser } from "../../../types";
import "./index.scss";

interface IProps {
	user: IUser;
}

const UserListItem: FC<IProps> = ({ user }) => {
	const auth = useAppSelector((state) => state.auth);
	const { user: accountUser } = auth;

	//@ts-ignore
	const profileRoute = `/user-profile/${user._id}`;
	const accountRoute = `/profile`;
	return (
		<div className="list_body">
			<div className="list_right">
				<img src={user.avatar} alt={user.username} />
			</div>
			<h2>{user.username}</h2>
			<Link
				to={
					user && accountUser?._id === user._id
						? accountRoute
						: profileRoute
				}
			>
				<button>View Profile</button>
			</Link>
		</div>
	);
};

export default UserListItem;
