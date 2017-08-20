'use strict';

const React = require('react');
const PropTypes = require('prop-types');

class Work extends React.Component {
	constructor(props) {
		super(props);
		this.interval = null;

		// configure settings for image slider:
        // width of image, speed of animation, time paused on each image, index of the slide
		this.width = 25;
		this.animationSpeed = 1000;
		this.pause = 3000;
		this.currentSlide = 1;
		this.animate = null;

		// cache slider DOM
		this.$slider = null,
		this.$slideContainer = null;
		this.$slides = null;
	}

	componentDidMount() {
		this.$slider = $('#slider');
		this.$slideContainer = $('#slides');
		this.$slides = $('.slide');
		this.animate = () => {
            // slide images to the left
            this.$slideContainer.animate({
                'margin-left': '-=' + this.width + 'em'
            }, this.animationSpeed, () => {
                // if you've hit the last image in the slideshow,
                // reset slider to 1st image
                if (++this.currentSlide === this.$slides.length) {
                    this.currentSlide = 1;
                    this.$slideContainer.css('margin-left', 0);
                }
            });
        };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.onWork) {
	        // run slider
	        this.interval = setInterval(this.animate, this.pause);
		} else {
			// reset slider
			clearInterval(this.interval);
			setTimeout(() => {
				this.currentSlide = 1;
				this.$slideContainer.css('margin-left', 0);
			}, 250);
		}
	}

	render() {
		const { onWork, onSettings } = this.props;
		return (
			<div className={`${onWork && !onSettings ? 'section-on' : ''} work-section`}>
				<div className='top-panel'>
					<div className='panel upper work'>
						<a href='https://www.behance.net/sgrund' target='_blank'>
							<div id='slider'>
								<ul id='slides'>
									<li className='slide slide1'><img className='picture' src='src/images/frame-0029.png' /></li>
									<li className='slide slide2'><img className='picture' src='src/images/frame-0155.png' /></li>
									<li className='slide slide3'><img className='picture' src='src/images/frame-0201.png' /></li>
									<li className='slide slide4'><img className='picture' src='src/images/frame-0228.png' /></li>
									<li className='slide slide5'><img className='picture' src='src/images/frame-0297.png' /></li>
									<li className='slide slide6'><img className='picture' src='src/images/frame-0029.png' /></li>
								</ul>
							</div>
						</a>
					</div>
				</div>
				<div className='bottom-panel'>
					<div className='panel lower work'>
						<a href='http://cs-361-project.github.io/prism-game/' className='prism' target='_blank'>
							<span className='letter P'>p</span>
							<span className='letter R'>r</span>
							<span className='letter I'>i</span>
							<span className='letter S'>s</span>
							<span className='letter M'>m</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Work.propTypes = {
	onWork: PropTypes.bool,
	onSettings: PropTypes.bool
};

module.exports = Work;
