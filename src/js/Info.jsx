'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Info = ({ hideAll, onInfo, onSettings }) => {
	return (
		<div className={`${!hideAll && onInfo && !onSettings ? 'section-on' : ''} info-section`}>
			<div className='top-panel top-color'>
				<div className='panel info'>
					Samuel Grund graduated from Oberlin College with a bachelor's degree in Computer Science on May 28th, 2018.
					Now almost 22 and full of vitality, he's ready to make slick web applications until he drops or is feeling tired.
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel info'>
					By day, he's a front end engineer at 1stdibs.com. By night, he enjoys basketball, cooking, reading, and coding.
					Sometimes he likes to make websites for his friends and family.
				</div>
			</div>
		</div>
	);
};

Info.propTypes = {
	hideAll: PropTypes.bool,
	onInfo: PropTypes.bool,
	onSettings: PropTypes.bool
};

module.exports = Info;
