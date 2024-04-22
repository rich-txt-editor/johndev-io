import React from "react";

function UserProfile() {
	const MEDIA_URL = "http://localhost:8000/media/";
	return (
		<div className="flex items-end">
			<div className="font-medium dark:text-white justify-end">
				<div>John Molina</div>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					Full-Stack Software Engineer
				</div>
			</div>
			<img
				className="w-4 h-4 p-4 rounded-full"
				src={`${MEDIA_URL}img/me.png`}
				alt="me"
			/>
		</div>
	);
}

export default UserProfile;

