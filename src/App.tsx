import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/layouts/authlayout/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import WebLayout from "./components/layouts/weblayout/WebLayout";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import UserProfile from "./pages/UserProfile";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<HomePage />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/create",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<CreatePage />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/search",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<SearchPage />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/chat",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<ChatPage />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/profile",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<ProfilePage />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/user-profile/:id",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<WebLayout>
						<UserProfile />
					</WebLayout>
				</ProtectedRoute>
			),
		},
		{
			path: "/sign-in",
			element: (
				<AuthLayout pageType="login">
					<LoginPage />
				</AuthLayout>
			),
		},
		{
			path: "/sign-up",
			element: (
				<AuthLayout pageType="register">
					<RegisterPage />
				</AuthLayout>
			),
		},
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
