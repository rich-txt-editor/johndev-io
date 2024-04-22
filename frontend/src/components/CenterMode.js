import React, { useEffect, useState, Component } from "react";
import Slider from "react-slick";
import { capitalize } from '../utils/utils';
import { LoadingAnimation } from '../utils/utils';
import Projects from "./Projects";

function CenterMode() {
	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "0px",
		slidesToShow: 1,
		speed: 500,
	};
	return (
		<div className="slider-container">
			<Slider {...settings}>
                <Projects />
			</Slider>
		</div>
	);
}

export default CenterMode;
