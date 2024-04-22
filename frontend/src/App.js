import React from "react";
import "./index.css";
import ProjectScroller from "./components/ProjectScroller";

function App() {
	return (
		<main className="container mx-auto px-4 pt-20 pb-12 h-14 bg-gradient-to-r from-sky-500 to-indigo-500">
			<div className="flex justify-center items-center p-20">
				<p className="text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">
					Recent Projects
				</p>
			</div>
			<ProjectScroller />
		</main>
	);
}

export default App;
