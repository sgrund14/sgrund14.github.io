'use strict';

const React = require('react');
const PropTypes = require('prop-types');

class Work extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.interval = null;

	// 	// configure settings for image slider:
 //        // width of image, speed of animation, time paused on each image, index of the slide
	// 	this.width = 25;
	// 	this.animationSpeed = 1000;
	// 	this.pause = 3000;
	// 	this.currentSlide = 1;
	// 	this.animate = null;

	// 	// cache slider DOM
	// 	this.$slider = null,
	// 	this.$slideContainer = null;
	// 	this.$slides = null;
	// }

	// componentDidMount() {
	// 	this.$slider = $('#slider');
	// 	this.$slideContainer = $('#slides');
	// 	this.$slides = $('.slide');
	// 	this.animate = () => {
 //            // slide images to the left
 //            this.$slideContainer.animate({
 //                'margin-left': '-=' + this.width + 'em'
 //            }, this.animationSpeed, () => {
 //                // if you've hit the last image in the slideshow,
 //                // reset slider to 1st image
 //                if (++this.currentSlide === this.$slides.length) {
 //                    this.currentSlide = 1;
 //                    this.$slideContainer.css('margin-left', 0);
 //                }
 //            });
 //        };
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.onWork && !nextProps.onSettings && !nextProps.hideAll) {
	//         // run slider
	//         this.interval = setInterval(this.animate, this.pause);
	// 	} else {
	// 		// reset slider
	// 		clearInterval(this.interval);
	// 		setTimeout(() => {
	// 			this.currentSlide = 1;
	// 			this.$slideContainer.css('margin-left', 0);
	// 		}, 250);
	// 	}
	// }

	render() {
		const { hideAll, onWork, onSettings } = this.props;
		return (
			<div className={`${!hideAll && onWork && !onSettings ? 'section-on' : ''} work-section`}>
				<div className='top-panel top-color'>
					<div className='panel upper work'>
						<a href='https://www.wobc.org' target='_blank'>
							<img className="wobc-logo" src="src/images/wobc-logo.png" alt=""/>
							{/*<div id='slider'>
															<ul id='slides'>
																<li class="slide slide1"><img class="picture" src="src/images/frame-0029.png" /></li>
										                        <li class="slide slide2"><img class="picture" src="src/images/frame-0155.png" /></li>
										                        <li class="slide slide3"><img class="picture" src="src/images/frame-0201.png" /></li>
										                        <li class="slide slide4"><img class="picture" src="src/images/frame-0228.png" /></li>
										                        <li class="slide slide5"><img class="picture" src="src/images/frame-0297.png" /></li>
										                        <li class="slide slide6"><img class="picture" src="src/images/frame-0029.png" /></li>
															</ul>
														</div>*/}
						</a>
					</div>
				</div>
				<div className='bottom-panel bottom-color'>
					<div className='panel lower work'>
						<a href='https://salt-and-pepper-games.github.io/prism' className='prism' target='_blank'>
							<span className='letter P'>p</span>
							<span className='letter R'>r</span>
							<span className='letter I'>i</span>
							<span className='letter S'>s</span>
							<span className='letter M'>m</span>
						</a>
						<a href="https://salt-and-pepper-games.github.io/" target="_blank" className="prism-blog">
							DEVELOPMENT BLOG
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Work.propTypes = {
	hideAll: PropTypes.bool,
	onWork: PropTypes.bool,
	onSettings: PropTypes.bool
};

module.exports = Work;
