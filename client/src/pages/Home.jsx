import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch("/api/posts/getposts");
			const data = await res.json();
			setPosts(data.posts);
		};
		fetchPosts();
	}, []);
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col max-w-6xl gap-8 px-6 pt-16 pb-24 mx-auto'>
				<h1 className='text-4xl font-extrabold text-gray-900 dark:text-white lg:text-6xl'>
					Welcome to ThoughtStream
				</h1>
				<p className='text-sm text-gray-600 dark:text-gray-300 lg:text-lg'>
					Here you'll find a variety of articles and tutorials on topics such as
					web development, software engineering, and programming languages.
				</p>
				<Link
					to='/search'
					className='inline-block px-4 py-2 text-sm font-semibold text-teal-700 transition duration-300 bg-teal-200 rounded-md hover:bg-teal-300'>
					View all posts
				</Link>
			</div>
			<div className='p-6 rounded-lg shadow-lg bg-amber-100 dark:bg-slate-800'>
				<CallToAction />
			</div>

			<div className='flex flex-col max-w-6xl gap-8 px-6 py-12 mx-auto'>
				{posts && posts.length > 0 && (
					<div className='flex flex-col gap-8'>
						<h2 className='text-3xl font-semibold text-center text-gray-900 dark:text-white'>
							Recent Posts
						</h2>
						<div className='flex flex-wrap gap-6'>
							{posts.map(post => (
								<PostCard
									key={post._id}
									post={post}
								/>
							))}
						</div>
						<Link
							to={"/search"}
							className='inline-block px-4 py-1 text-lg font-semibold text-center text-teal-700 transition duration-300 bg-teal-200 rounded-md hover:bg-teal-300'>
							View all posts
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
