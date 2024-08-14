import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Login = () => {
	const [formData, setFormData] = useState({});
	const { loading, error: errorMessage } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};
	// console.log(setFormData);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			return dispatch(signInFailure("All fields are required"));
		}

		try {
			dispatch(signInStart());
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(signInFailure(data.message));
			}

			if (res.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (err) {
			dispatch(signInFailure(err.message));
		}
	};
	return (
		<div className='min-h-screen mt-20'>
			<div className='flex flex-col max-w-3xl gap-16 p-3 mx-auto md:flex-row md:items-center'>
				{/* left */}
				<div className='flex-1'>
					<Link
						to='/'
						className='text-4xl font-bold dark:text-white'>
						<span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
							Login
						</span>
					</Link>
					<p className='mt-5 text-sm'>
						This is a demo project. You can sign in with your email and password
						or with Google.
					</p>
				</div>
				{/* right */}

				<div className='flex-1'>
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit}>
						<div>
							<Label value='Email' />
							<TextInput
								type='email'
								placeholder='name@gmail.com'
								id='email'
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label value='Password' />
							<TextInput
								type='password'
								placeholder='*********'
								id='password'
								onChange={handleChange}
							/>
						</div>
						<Button
							gradientDuoTone='purpleToPink'
							type='submit'
							disabled={loading}>
							{loading ? (
								<>
									<Spinner size='sm' />
									<span className='pl-3'>Loading...</span>
								</>
							) : (
								"Login"
							)}
						</Button>
						<OAuth />
					</form>
					<div className='flex gap-2 mt-5 text-sm'>
						<span>Don't have an account?</span>
						<Link
							to='/signup'
							className='text-blue-500'>
							SignUp
						</Link>
					</div>
					{errorMessage && (
						<Alert
							className='mt-5'
							color='failure'>
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
