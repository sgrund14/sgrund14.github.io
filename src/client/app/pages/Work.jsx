import React from "react";

export default class Work extends React.Component {

	componentDidUpdate() {
		// let thing = document.getElementsByClassName("work");
		// console.log(thing);

        // configure settings for image slider:
        // width of image, speed of animation, time paused on each image, index of the slide
        var width = 25;
        var animationSpeed = 1000;
        var pause = 3000;
        var currentSlide = 1;

        // cache slider DOM
        var slider = document.getElementById('slider');
        var slideContainer = document.getElementById('slides');
        var slides = document.getElementsByClassName('slide');
        console.log(slider);

        var interval;

        // run slider
        interval = setInterval(function () {
            // slide images to the left
            slideContainer.animate({
                'margin-left': '-=' + width + 'em'
            }, animationSpeed, function () {
                // if you've hit the last image in the slideshow,
                // reset slider to 1st image
                if (++currentSlide === slides.length) {
                    currentSlide = 1;
                    slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
	}

	render() {
		return (
			<div>
				<div slider>
					<div className="top-panel">
						<div className="panel upper work">
							<a href="https://www.behance.net/sgrund" target="_blank">
								<div id="slider">
									<ul id="slides">
										<li className="slide slide1"><img className="picture" src="images/frame-0029.png" /></li>
										<li className="slide slide2"><img className="picture" src="images/frame-0155.png" /></li>
										<li className="slide slide3"><img className="picture" src="images/frame-0201.png" /></li>
										<li className="slide slide4"><img className="picture" src="images/frame-0228.png" /></li>
										<li className="slide slide5"><img className="picture" src="images/frame-0297.png" /></li>
										<li className="slide slide6"><img className="picture" src="images/frame-0029.png" /></li>
									</ul>
								</div>
							</a>
						</div>
					</div>
					<div className="bottom-panel">
						<div className="panel lower work">
							<a href="http://cs-361-project.github.io/prism-game/" className="prism" target="_blank">
								<span className="letter P">p</span>
								<span className="letter R">r</span>
								<span className="letter I">i</span>
								<span className="letter S">s</span>
								<span className="letter M">m</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			);
	}
}