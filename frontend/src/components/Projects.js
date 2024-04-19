import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { capitalize } from "../utils/utils";
import { LoadingAnimation } from "../utils/utils";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get("http://localhost:8000/api/projects/");
				setProjects(response.data);
			} catch (error) {
				console.error("There was an error fetching the projects:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const openModal = (project) => {
		console.log("Opening modal for project:", project.title);
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProject(null);
	};

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl font-bold my-8 dark:text-stone-100 text-center">
				My Projects
			</h1>
			{isLoading ? (
				<LoadingAnimation />
			) : projects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
					{projects.map((project) => (
						<div
							key={project.id}
							className="border rounded-lg shadow-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 bg-gray-50 dark:bg-slate-800"
							onClick={() => openModal(project)}
						>
							<h2 className="text-3xl font-semibold dark:text-slate-100 text-center">
								{project.title}
							</h2>
							{project.images && project.images.length > 0 && (
								<img
									src={project.images[0].image}
									alt={project.images[0].caption || "Project thumbnail"}
									className="w-full h-auto mt-2"
								/>
							)}
						</div>
					))}
				</div>
			) : (
				<p>No projects found</p>
			)}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				{selectedProject && (
					<div>
						<h2 className="text-2xl font-bold dark:text-white mb-4 text-center">
							{selectedProject.title}
						</h2>
						<p className="text-lg dark:text-gray-200 mb-4 text-left">
							{selectedProject.description}
						</p>
						<p className="dark:text-gray-300 italic mb-2 text-left">
							Role: {selectedProject.contribution_role}
						</p>
						{selectedProject.images &&
							selectedProject.images.length > 0 &&
							selectedProject.images.map((img, index) => (
								<div key={index} className="my-2">
									<img
										src={img.image}
										alt={img.caption || "Project image"}
										className="w-full h-auto rounded-lg shadow"
									/>
									{img.caption && (
										<p className="text-center text-gray-400 text-sm mt-2">
											{img.caption}
										</p>
									)}
								</div>
							))}
						<p className="mt-2 text-center">
							Technologies: {selectedProject.technologies}
						</p>
						<p className="dark:text-gray-300 italic text-center">
							Status: {capitalize(selectedProject.status.replace(/_/g, " "))}
						</p>
						<br></br>
						<div className="text-center">
							{selectedProject.link && (
								<a
									href={selectedProject.link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-sky-600 underline text-center"
								>
									Live Version
								</a>
							)}
							{selectedProject.repo_link && (
								<a
									href={selectedProject.repo_link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-center ml-4 text-sky-600 hover:text-sky-400"
								>
									Github Repo
								</a>
							)}
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default Projects;
