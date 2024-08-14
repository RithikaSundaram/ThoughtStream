export default function About() {
	return (
		<div className='flex items-center justify-center min-h-screen text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-200 '>
			<div className='max-w-2xl p-6 mx-auto bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='mb-6 text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400'>
					About ThoughtStream
				</h1>
				<div className='flex flex-col gap-6 text-justify text-gray-700 dark:text-gray-300'>
					<p className='text-lg leading-relaxed'>
						Welcome to ThoughtStream! This blog was created as a personal
						project to share insights, ideas, and knowledge with the world.
						ThoughtStream is a platform for exploring topics related to
						technology, programming, and development.
					</p>

					<p className='text-lg leading-relaxed'>
						On ThoughtStream, you will find a diverse range of articles,
						tutorials, and resources covering web development, software
						engineering, and the latest trends in technology. Our goal is to
						provide valuable content that helps you stay updated and improve
						your skills.
					</p>

					<p className='text-lg leading-relaxed'>
						We encourage you to interact with our content by leaving comments
						and engaging with other readers. We believe in fostering a community
						where learning and sharing knowledge are at the forefront.
					</p>
				</div>
			</div>
		</div>
	);
}
