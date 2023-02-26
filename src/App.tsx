import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/layouts/authlayout/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				//@ts-ignore
				<ProtectedRoute>
					<HomePage />
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
