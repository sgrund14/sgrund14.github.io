'use strict';

const React = require('react');
const PropTypes = require('prop-types');
import ReactSlider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props: Object) => {
	const { style, onClick } = props
	return (
		<i
			className={`fa fa-chevron-right arrow-right custom-arrow`}
			style={{ ...style }}
			onClick={onClick}
		/>
	);
};

const PrevArrow = (props: Object) => {
	const { style, onClick } = props
	return (
		<i
		  className={`fa fa-chevron-left arrow-left custom-arrow`}
		  style={{ ...style }}
		  onClick={onClick}
		/>
	);
};

class Work extends React.Component {

	render() {
		const { hideAll, onWork, onSettings } = this.props;
		return (
			<div className={`${!hideAll && onWork && !onSettings ? 'section-on' : ''} work-section`}>
				<div className='top-panel top-color'>
					<div className='panel upper work'>
						<div className="slide">
							<a className="work-link" href='https://www.wobc.org' target='_blank'>
								<img className="wobc-logo" src="src/images/wobc-logo-05.png" alt=""/>
							</a>
						</div>
					</div>
					<div className='panel upper work'>
						<div className="slide">
							<a className="work-link" href="https://fabb.world" target='_blank'>
								<img className="wobc-logo" src="src/images/FAB_sam-10.png" alt=""/>
							</a>
						</div>
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
						<div className="prism-drawer hidden">
							<a href="https://salt-and-pepper-games.github.io/" target="_blank" className="prism-blog">
							DEVELOPMENT BLOG
							</a>
							<a href="https://salt-and-pepper-games.github.io/prism-splash/" target="_blank" className="prism-splash">
								SPLASH PAGE
							</a>
						</div>
					</div>
					<div className="panel lower work bottom-color">
						<a href="http://deborahdavisjackson.org/" target="_blank" className="deborah">
							DDJ: Deborah Davis Jackson
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
