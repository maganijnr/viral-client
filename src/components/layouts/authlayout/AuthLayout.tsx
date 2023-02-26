import "./index.scss";
import { ReactNode, FC, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/app";

interface IProps {
	pageType?: string;
	children?: ReactNode;
}

const AuthLayout: FC<IProps> = ({ pageType, children }) => {
	const navigate = useNavigate();
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	return (
		<section
			className={pageType === "login" ? "login_body" : "register_body"}
		>
			<header className="nav_header">
				<div className="nav_container">
					<h2
						className={pageType === "login" ? "login_h2" : "register_h2"}
					>
						VIRAL
					</h2>

					<button className="menu_btn" onClick={() => setMenuOpen(true)}>
						<BiMenu
							fontSize={35}
							color={pageType === "login" ? "#fff" : "#000"}
						/>
					</button>
					<div className="nav_btns">
						<Link
							to="/sign-in"
							className={
								pageType === "login"
									? "login_btn_otl"
									: "register_btn_otl"
							}
						>
							Sign in
						</Link>
						<Link
							to="/sign-up"
							className={
								pageType === "login"
									? "login_btn_fill"
									: "register_btn_fill"
							}
						>
							Sign up
						</Link>
					</div>
				</div>

				<div
					className={isMenuOpen ? "mobile_menu_open" : "mobile_menu_close"}
				>
					<button className="close_btn" onClick={() => setMenuOpen(false)}>
						<IoCloseSharp
							fontSize={35}
							color={pageType === "login" ? "#fff" : "#000"}
						/>
					</button>

					<div className="mobile_nav_btns">
						<button
							className={
								pageType === "login"
									? "login_btn_otl"
									: "register_btn_otl"
							}
							onClick={() => {
								navigate("/sign-in");
								setMenuOpen(false);
							}}
						>
							Sign in
						</button>
						<button
							className={
								pageType === "login"
									? "login_btn_fill"
									: "register_btn_fill"
							}
							onClick={() => {
								navigate("/sign-up");
								setMenuOpen(false);
							}}
						>
							Sign up
						</button>
					</div>
				</div>
			</header>
			<div className="children_wrapper">{children}</div>
		</section>
	);
};

export default AuthLayout;
