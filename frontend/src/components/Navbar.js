import React, { useState, useEffect } from "react";

export default function Navbar({ setIsNavbarExpanded }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [urls, setUrls] = useState({});

    // Define toggleMenu function
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsNavbarExpanded(!isMenuOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest("#menu-toggle-container") && isMenuOpen) {
                setIsMenuOpen(false);
                setIsNavbarExpanded(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        // Fetch URLs from data attribute
        const navbarData = document.getElementById('react-navbar');
        if (navbarData) {
            const urlsData = JSON.parse(navbarData.getAttribute('data-urls'));
            setUrls(urlsData);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isMenuOpen, setIsNavbarExpanded]);

    return (
        <nav className="flex items-center justify-between flex-wrap dark:bg-gray-800 bg-gray-300 p-3">
            <div className="flex items-center flex-shrink-0 dark:text-white mr-6">
                <a href={urls.blog || '/blog/'} className="font-semibold text-5xl tracking-tight">
                    🌌
                </a>
            </div>
            <div className="block lg:hidden" id="menu-toggle-container">
                <button
                    id="menu-toggle"
                    onClick={toggleMenu}
                    className="flex items-center px-3 py-2 border rounded text-pastelgreen-400 border-pastelgreen-400 hover:text-sky-400 hover:border-sky-400"
                >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? "" : "hidden"} text-center lg:text-right`}
                id="menu"
            >
                <div className="text-md lg:flex-grow">
                    <a href={urls.home || '/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">Portfolio</a>
                    <a href={urls.blog || '/blog/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">Blog</a>
                    <a href={urls.about || '/about/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">About</a>
                    <a href={urls.resume || '/resume/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">Resume</a>
                    <a href={urls.skills || '/skills/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">Skills</a>
                    <a href={urls.contact || '/contact/'} className="block mt-4 lg:inline-block lg:mt-0 dark:text-platinum-400 hover:text-sky-400 mr-4">Contact</a>
                </div>
            </div>
        </nav>
    );
}
