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
					<div className="panel-row">
						<div className='panel upper work'>
							<div className="slide">
								<a className="work-link" href='https://www.wobc.org' target='_blank'>
									<img className="wobc-logo" src="src/images/wobc.png" alt=""/>
								</a>
								<span className="work-subtext">WOBC: Oberlin College and Community Radio</span>
							</div>
						</div>
						<div className='panel upper work'>
							<div className="slide">
								<a className="work-link" href="https://fabb.world" target='_blank'>
									<img className="wobc-logo" src="src/images/fabb.png" alt=""/>
								</a>
								<span className="work-subtext">FABB: Femme Artists Breaking Boundaries</span>
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-panel bottom-color'>
					<div className="panel-row">
						<div className='panel lower work'>
							<div className="slide">
								<a href="https://salt-and-pepper-games.github.io/prism/#/" target="_blank" className="work-link">
									<img src="src/images/prism.png" alt="" className="wobc-logo"/>
								</a>
								<span className="work-subtext">Prism: A Salt and Pepper Games Production</span>
							</div>
							{/*<a href='https://salt-and-pepper-games.github.io/prism' className='prism' target='_blank'>
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
							</div>*/}
						</div>
						<div className="panel lower work bottom-color">
							<div className="slide">
								<a href="http://deborahdavisjackson.org/" target="_blank" className="work-link">
									<img src="src/images/ddj.png" alt="" className="wobc-logo"/>
								</a>
								<span className="work-subtext">DDJ: Deborah Davis Jackson</span>
							</div>
							{/*<a href="http://deborahdavisjackson.org/" target="_blank" className="deborah">
								DDJ
							</a>*/}
						</div>
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
