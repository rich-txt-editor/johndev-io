document.addEventListener("DOMContentLoaded", function () {
	const menuToggle = document.getElementById("menu-toggle");
	const menuToggleContainer = document.getElementById("menu-toggle-container");
	const menu = document.getElementById("menu");
	const navLinks = document.querySelectorAll("#menu a");
	const scrollLeftButton = document.getElementById("scrollLeftButton");
	const scrollRightButton = document.getElementById("scrollRightButton");
	const carouselContainer = document.querySelector(".carousel-container");

	// Functions for scrolling
	function scrollLeft() {
		carouselContainer.scrollBy({ left: -600, behavior: "smooth" });
	}

	function scrollRight() {
		carouselContainer.scrollBy({ left: 600, behavior: "smooth" });
	}

	// Add event listeners for scrolling
	scrollLeftButton.addEventListener("click", scrollLeft);
	scrollRightButton.addEventListener("click", scrollRight);

	function toggleMenu(open) {
		if (open) {
			menu.classList.remove("hidden");
			setTimeout(() => {
				menu.style.opacity = 1;
				menu.style.height = "auto";
			}, 10);
		} else {
			menu.style.opacity = 0;
			menu.style.height = 0;
			setTimeout(() => {
				menu.classList.add("hidden");
			}, 300);
		}
	}

	function adjustMenuForWindowSize() {
		if (window.innerWidth >= 1024) {
			menuToggleContainer.style.opacity = 0;
			toggleMenu(true);
		} else {
			menuToggleContainer.style.opacity = 1;
			if (!menu.classList.contains("hidden")) {
				toggleMenu(false);
			}
		}
	}

	menuToggle.addEventListener("click", function () {
		const isOpen = menu.classList.contains("hidden");
		toggleMenu(isOpen);
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth < 1024) {
				toggleMenu(false);
			}
		});
	});

	window.addEventListener("resize", adjustMenuForWindowSize);
	adjustMenuForWindowSize();
});
