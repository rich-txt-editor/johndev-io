import React from "react";
import "./index.css";
import ProjectScroller from "./components/ProjectScroller";
import UserProfile from "./components/UserProfile";
import RecentProjectsHeader from "./components/RecentProjectsHeader";

function App() {
    return (
        <main className="container mx-auto min-h-screen flex flex-col">
            <header className="w-full flex items-center px-4 py-2">
                <div className="flex-grow"></div> {/* This div pushes the UserProfile to the right */}
				<UserProfile />
            </header>
			<div className="flex-grow flex flex-col items-center">
                <div>
                    <RecentProjectsHeader />
                </div>
                <div className="w-full flex-grow">
                    <ProjectScroller />
                </div>
            </div>
        </main>
    );
}

export default App;
