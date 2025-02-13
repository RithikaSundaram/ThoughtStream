import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const handleChange = e => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};
	// console.log(setFormData);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!formData.username || !formData.email || !formData.password) {
			return setErrorMessage("All fields are required");
		}

		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				setLoading(false);
				return setErrorMessage(data.message);
			}
			setLoading(false);
			if (res.ok) {
				navigate("/login");
			}
		} catch (err) {
			setErrorMessage(err.message);
			setLoading(false);
		}
	};
	return (
		<div className='min-h-screen mt-20'>
			<div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-16'>
				{/* left */}
				<div className='flex-1'>
					<Link
						to='/'
						className='font-bold dark:text-white text-4xl'>
						<span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
							SignUp
						</span>
					</Link>
					<p className='text-sm mt-5'>
						This is a demo project. You can sign up with your email and password
						or with Google.
					</p>
				</div>
				{/* right */}

				<div className='flex-1'>
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit}>
						<div>
							<Label value='Username' />
							<TextInput
								type='text'
								placeholder='Username'
								id='username'
								onChange={handleChange}
							/>
						</div>
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
								"Sign Up"
							)}
						</Button>
					</form>
					<div className='flex gap-2 text-sm mt-5'>
						<span>Already have an account?</span>
						<Link
							to='/login'
							className='text-blue-500'>
							Login
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

export default Signup;
