import { useState } from "react";
import "./index.scss";
import { ThreeCircles } from "react-loader-spinner";
import { loginUser } from "../../store/actions/authActions";
import { useAppDispatch } from "../../store/hooks/app";
import { setUser } from "../../store/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!username) {
			return setErrorMessage("Username is required");
		}

		if (!password) {
			return setErrorMessage("Password is required");
		}

		if (!confirmPassword) {
			return setErrorMessage("Confirm Password is required");
		}

		if (password !== confirmPassword) {
			return setErrorMessage("Passwords don't match");
		}

		setLoading(true);
		try {
			const result = await loginUser({ username, password });

			if (result.error) {
				setErrorMessage(result.error);
				setLoading(false);
				return;
			}

			if (result.user) {
				localStorage.setItem("viralUser", JSON.stringify(result.user));
				localStorage.setItem("viralToken", JSON.stringify(result.token));

				dispatch(setUser(result));
				setUsername("");
				setPassword("");
				setConfirmPassword("");
				setLoading(false);
				navigate("/");
				return;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="children_wrapper">
			<h2>Welcome back</h2>

			<form className="login_form_wrapper" onSubmit={handleSubmit}>
				<div className="input_group">
					<label className="input_label" htmlFor="username">
						Username
					</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="input"
						name="username"
						type="text"
					/>
				</div>
				<div className="input_group">
					<label className="input_label" htmlFor="password">
						Password
					</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input"
						name="password"
						type="password"
					/>
				</div>

				<div className="input_group">
					<label className="input_label" htmlFor="confirmPassword">
						Confirm Password
					</label>
					<input
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="input"
						name="confirmPassword"
						type="password"
					/>
				</div>

				<button type="submit" className="form_btn">
					{loading ? (
						<ThreeCircles height={25} width={25} color="#fff" />
					) : (
						"Sign in"
					)}
				</button>

				{errorMessage && <p className="error_msg">{errorMessage}</p>}
				<Link to="/sign-up">
					<p>Don't have an account? Sign Up</p>
				</Link>
			</form>
		</div>
	);
};

export default LoginPage;
