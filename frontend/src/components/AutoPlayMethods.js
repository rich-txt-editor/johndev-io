import React, { useState, useEffect, useRef } from "react";
import "flowbite";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Play from "./Play";
import Pause from "./Pause";

// Define a class for Project to structure the data (as already defined)
class Project {
	constructor({
		id,
		title,
		description,
		contribution_role,
		created_at,
		updated_at,
		status,
		technologies,
		tags,
		images,
		repo_link,
		is_featured,
		link,
	}) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.contributionRole = contribution_role;
		this.createdAt = created_at;
		this.updatedAt = updated_at;
		this.status = status;
		this.technologies = technologies;
		this.tags = tags;
		this.images = images; // Ensure images array has data or handle empty/null case
		this.repoLink = repo_link;
		this.isFeatured = is_featured;
		this.link = link;
	}
}

function AutoPlayMethods() {
	let sliderRef = useRef(null);
	const [projects, setProjects] = useState(new Map());

	// Fetch projects data and store it in state
	useEffect(() => {
		fetch("http://localhost:8000/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				const newProjects = new Map();
				data.forEach((projectData) => {
					const project = new Project(projectData);
					newProjects.set(project.id, project);
				});
				setProjects(newProjects);
			})
			.catch((error) => console.error("Error fetching projects:", error));
	}, []);

	const play = () => {
		sliderRef.current.slickPlay();
	};

	const pause = () => {
		sliderRef.current.slickPause();
	};

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2800,
	};

	return (
		<div className="slider-container text-center p-200">
			<div className="flex justify-center items-center m-96">
				<p className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white">
					My Recent Projects
				</p>
			</div>

			<Slider ref={sliderRef} {...settings}>
				{Array.from(projects.values()).map((project, index) => (
					<div key={project.id}>
						<div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{project.title}
							</h5>
							<div className="flex justify-center items-center p-96">
								<a href={`/project/${project.id}/`}>
									<img
										className="rounded-t-lg"
										src={
											project.images.length > 0 ? project.images[0].image : "🏜️"
										} // Fallback if no image is available
										alt={project.title}
									/>
								</a>
							</div>

							<div className="p-5">
								<a href={project.link || "#"}></a>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
									{project.description}
								</p>
								<a
									href={project.repoLink || "#"}
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Read more
								</a>
							</div>
						</div>
					</div>
				))}
			</Slider>

			<div style={{ textAlign: "center", marginTop: "30px" }}>
				<Play />
				<Pause />
			</div>
		</div>
	);
}

export default AutoPlayMethods;
