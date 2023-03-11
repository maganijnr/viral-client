import { useState, useEffect } from "react";
import "./index.scss";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import { searchUsers } from "../../store/actions/userActions";
import { useAppSelector } from "../../store/hooks/app";
import { IUser } from "../../types";
import Loader from "../../components/atoms/Loader";
import UserListItem from "../../components/atoms/UserListItem";

const SearchPage = () => {
	const [searchLoading, setSearchLoading] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const [userList, setUserList] = useState<IUser[]>([]);
	const auth = useAppSelector((state) => state.auth);
	const { token } = auth;

	useEffect(() => {
		const fetchUsers = async () => {
			setSearchLoading(true);

			if (!token) return;

			try {
				const res = await searchUsers(searchInput, token);

				setUserList(res.users);
				setSearchLoading(false);
			} catch (error) {
				console.log(error);
				setSearchLoading(false);
			}
		};

		fetchUsers();
	}, [searchInput]);
	return (
		<div className="page_container">
			<h2>Search</h2>

			<div className="search_body">
				<div className="search_input">
					<AiOutlineSearch fontSize={18} className="icons" />
					<input
						placeholder="Search for users"
						value={searchInput}
						name="searchInput"
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					{searchLoading ? (
						<ThreeCircles color="#fff" width={18} height={18} />
					) : (
						<AiOutlineCloseCircle
							fontSize={18}
							onClick={() => setSearchInput("")}
							className="icons"
						/>
					)}
				</div>

				<hr className="search_line" />

				<div className="search_list">
					{searchLoading ? (
						<Loader />
					) : userList.length > 0 ? (
						<>
							{userList.map((user) => (
								<UserListItem key={user._id} user={user} />
							))}
						</>
					) : (
						<p>No user found</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
