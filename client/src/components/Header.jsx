import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const HeaderCom = () => {
	const { currentUser } = useSelector(state => state.user);
	const { theme } = useSelector(state => state.theme);
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	console.log(currentUser);
	return (
		<Navbar className='border-b-2'>
			<Link
				to='/'
				className='self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white'>
				<span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
					ThoughtStream
				</span>
			</Link>
			<form>
				<TextInput
					type='text'
					placeholder='Search...'
					rightIcon={AiOutlineSearch}
					className='hidden lg:inline'
				/>
			</form>
			<Button
				className='w-12 h-10 lg:hidden'
				color='gray'
				pill>
				<AiOutlineSearch />
			</Button>
			<div className='flex gap-2 md:order-2'>
				<Button
					className='hidden w-12 h-10 sm:inline'
					color='gray'
					pill
					onClick={() => dispatch(toggleTheme())}>
					{theme === "light" ? <FaSun /> : <FaMoon />}
				</Button>
				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt='user'
								img={currentUser.profilePicture || "/images/profile.png"}
								rounded
							/>
						}>
						<Dropdown.Header>
							<span className='block text-sm'>@{currentUser.username}</span>
							<span className='block text-sm font-medium truncate'>
								{currentUser.email}
							</span>
						</Dropdown.Header>
						<Link to={"/dashboard?tab=profile"}>
							<Dropdown.Item>Profile</Dropdown.Item>
						</Link>
						<Dropdown.Divider />
						<Dropdown.Item>Sign out</Dropdown.Item>
					</Dropdown>
				) : (
					<Link to='/login'>
						<Button
							gradientDuoTone='purpleToBlue'
							outline>
							Login
						</Button>
					</Link>
				)}

				<Navbar.Toggle />
			</div>

			{/* Navigation Links */}
			<div className='flex gap-8 mt-4 md:mt-0'>
				<Link
					to='/'
					className={`text-xl font-medium ${
						pathname === "/" ? "text-blue-500" : "text-gray-700"
					}`}>
					Home
				</Link>
				<Link
					to='/about'
					className={`text-xl font-medium ${
						pathname === "/about" ? "text-blue-500" : "text-gray-700"
					}`}>
					About
				</Link>
				<Link
					to='/projects'
					className={`text-xl font-medium ${
						pathname === "/projects" ? "text-blue-500" : "text-gray-700"
					}`}>
					Projects
				</Link>
			</div>
			{/* <Navbar.Collapse>
				<Navbar.Link
					active={pathname === "/"}
					as={"div"}>
					<Link to='/'>Home</Link>
				</Navbar.Link>
				<Navbar.Link
					active={pathname === "/about"}
					as={"div"}>
					<Link to='/about'>About</Link>
				</Navbar.Link>
				<Navbar.Link
					active={pathname === "/projects"}
					as={"div"}>
					<Link to='/projects'>Projects</Link>
				</Navbar.Link>
			</Navbar.Collapse> */}
		</Navbar>
	);
};

export default HeaderCom;
