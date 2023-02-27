import { FC, ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.scss";

import { HiOutlineHome } from "react-icons/hi";
import { MdCreateNewFolder } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useAppSelector } from "../../../store/hooks/app";

interface IProps {
	children?: ReactNode;
}

const WebLayout: FC<IProps> = ({ children }) => {
	const auth = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { user } = auth;
	return (
		<div className="web_wrapper">
			<div className="side_bar">
				<Link to="/" className="logo_name">
					VIRAL
				</Link>

				<div className="side_bar_items">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "side_bar_item" : "side_bar_item_close"
						}
					>
						<HiOutlineHome fontSize={20} />
						<h2>Home</h2>
					</NavLink>
					<NavLink
						to="/search"
						className={({ isActive }) =>
							isActive ? "side_bar_item" : "side_bar_item_close"
						}
					>
						<BiSearchAlt fontSize={20} />
						<h2>Search</h2>
					</NavLink>
					<NavLink
						to="/chat"
						className={({ isActive }) =>
							isActive ? "side_bar_item" : "side_bar_item_close"
						}
					>
						<AiOutlineMessage fontSize={20} />
						<h2>Messages</h2>
					</NavLink>
					<NavLink
						to="/create"
						className={({ isActive }) =>
							isActive ? "side_bar_item" : "side_bar_item_close"
						}
					>
						<MdCreateNewFolder fontSize={20} />
						<h2>Create</h2>
					</NavLink>
				</div>

				<div className="profile_link" onClick={() => navigate("/profile")}>
					<div className="profile_img">
						<img
							src={
								`https://res.cloudinary.com/dj9ndrcxg/image/upload/v1677266736/cejzedfrawtljzaejclz.webp` ??
								user?.avatar
							}
							alt="user"
						/>
					</div>
					<h2>Profile</h2>
				</div>
			</div>
			<div className="app_wrapper">{children}</div>
		</div>
	);
};

export default WebLayout;
