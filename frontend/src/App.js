import React from "react";
import "./index.css";
import ProjectScroller from "./components/ProjectScroller";
import UserProfile from "./components/UserProfile";
import RecentProjectsHeader from "./components/RecentProjectsHeader";

function App() {
    return (
        <main className="min-h-screen flex flex-col lg:flex-row overflow-hidden">  {/* Use column layout on small screens and row layout on large screens */}
            {/* Main Content Column */}
            <div className="flex-grow flex flex-col items-center overflow-visible lg:order-2"> {/* Change order on large screens */}
                <header className="w-full max-w-4xl overflow-visible mx-auto px-4 py-6">
                    <RecentProjectsHeader />
                </header>
                <div className="w-full max-w-4xl overflow-visible mx-auto p-4 flex-grow">
                    <ProjectScroller />
                </div>
            </div>

            {/* Side Column for UserProfile, initially on top on small screens */}
            <div className="w-full ring-2 lg:w-1/5 flex flex-col items-center px-4 py-2 lg:order-1">  {/* Full width on small screens, sidebar width on large screens */}
                <UserProfile />
            </div>
        </main>
    );
}

export default App;
