import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import FooterCom from "./components/Footer";
import HeaderCom from "./components/Header";
import Search from "./pages/Search";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<HeaderCom />
			<Routes>
				<Route
					path='/'
					element={<Home />}></Route>
				<Route
					path='/about'
					element={<About />}></Route>

				<Route
					path='/signup'
					element={<Signup />}></Route>
				<Route
					path='/login'
					element={<Login />}></Route>
				<Route
					path='/search'
					element={<Search />}></Route>
				<Route element={<PrivateRoute />}>
					<Route
						path='/dashboard'
						element={<Dashboard />}></Route>
				</Route>
				<Route element={<OnlyAdminPrivateRoute />}>
					<Route
						path='/create-post'
						element={<CreatePost />}></Route>
					<Route
						path='/update-post/:postId'
						element={<UpdatePost />}></Route>
				</Route>
				<Route
					path='/projects'
					element={<Projects />}></Route>
				<Route
					path='/post/:postSlug'
					element={<PostPage />}></Route>
			</Routes>
			<FooterCom />
		</BrowserRouter>
	);
};

export default App;
