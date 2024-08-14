import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

const Dashboard = () => {
	const [tab, setTab] = useState("");
	const location = useLocation();
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);
	console.log(tab);

	return (
		<div className='flex flex-col min-h-screen md:flex-row'>
			<div className='md:w-56'>
				{/* Sidebar */}
				<DashSidebar />
			</div>
			{/* profile... */}
			{tab === "profile" && <DashProfile />}
			{/* posts... */}
			{tab === "posts" && <DashPosts />}
			{/* users */}
			{tab === "users" && <DashUsers />}
			{/* comments  */}
			{tab === "comments" && <DashComments />}
			{/* dashboard comp */}
			{tab === "dash" && <DashboardComp />}
		</div>
	);
};

export default Dashboard;
