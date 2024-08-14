import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const FooterCom = () => {
	return (
		<Footer
			container
			className='border border-t-8 border-teal-500'>
			<div className='w-full mx-auto max-w-7xl'>
				<div className='grid justify-between w-full sm:flex md:grid-cols-1'>
					<div className='mt-5'>
						<Link
							to='/'
							className='self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white'>
							<span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
								Rithika
							</span>
							Blog
						</Link>
					</div>
					<div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
						<div>
							<Footer.Title title='About' />
							<Footer.LinkGroup col>
								<Footer.Link
									href='https:www.goole.com'
									target='_blank'
									rel='noopener noreferrer'>
									ThoughtStream
								</Footer.Link>
								<Footer.Link
									href='/about'
									target='_blank'
									rel='noopener noreferrer'>
									Blog
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title='Follow us' />
							<Footer.LinkGroup col>
								<Footer.Link
									href='https://www.github.com/RithikaSundaram'
									target='_blank'
									rel='noopener noreferrer'>
									GitHub
								</Footer.Link>
								<Footer.Link href='#'>Discord</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title='Legal' />
							<Footer.LinkGroup col>
								<Footer.Link href='#'>Privacy Policy</Footer.Link>
								<Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className='w-full sm:flex sm:items-center sm:justify-between'>
					<Footer.Copyright
						href='#'
						by="Rithika's blog"
						year={new Date().getFullYear()}
					/>
					<div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
						<Footer.Icon
							href='#'
							icon={BsFacebook}
						/>
						<Footer.Icon
							href='#'
							icon={BsInstagram}
						/>
						<Footer.Icon
							href='#'
							icon={BsTwitter}
						/>
						<Footer.Icon
							href='https://github.com/RithikaSundaram'
							icon={BsGithub}
						/>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterCom;
