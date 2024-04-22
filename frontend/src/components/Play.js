import React, { useState, useEffect, useRef } from "react";
import "flowbite";
import { Button } from "flowbite-react";

const play = () => {
    sliderRef.current.slickPlay();
};




export default function Play() {
	return (
		<div>
			<button
				type="button"
				className="dark:text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 m-50"
				onClick={play}
			>
				Play
			</button>
		</div>
	);
}
