import React from "react";

export default function Footer() {
  const year = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="dark:bg-gray-800 bg-gray-200 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm md:text-base">© {year} John R. Molina. All rights reserved.</p>
        <p className="text-sm md:text-base">Made with React, Django, TailwindCSS, and a whole lot of ❤️‍🔥</p>
        <div className="space-x-4 md:justify-start md:space-x-6 mt-4">
          <a href="https://twitter.com/rich_txt_editor" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">Twitter</a>
          <a href="https://github.com/rich_txt_editor" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">GitHub</a>
          <a href="https://linkedin.com/in/jrmolin90" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">LinkedIn</a>
        </div>
      </div>

      </div>
    </footer>
  );
}

