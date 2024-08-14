/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Include your React app's paths
		"node_modules/flowbite-react/**/*.js", // Include Flowbite components
		"node_modules/flowbite/**/*.js", // Include Flowbite CSS
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("flowbite/plugin"), // Include the Flowbite plugin
	],
};
