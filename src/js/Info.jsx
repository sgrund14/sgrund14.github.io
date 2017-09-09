'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Info = ({ hideAll, onInfo, onSettings }) => {
	return (
		<div className={`${!hideAll && onInfo && !onSettings ? 'section-on' : ''} info-section`}>
			<div className='top-panel top-color'>
				<div className='panel info'>
					Samuel Grund is a fourth year college student at Oberlin College pursuing a bachelor's degree in Computer Science.
					He's savvy with hip front end techonologies like React, Redux, and GraphQL, and enjoys making slick web applications.
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel info'>
					In the past, he's tried his hand in game development, providing excellent wait service at nice restaurants, and developing top-notch internal tools for 1stdibs.com.
					Today, he enjoys basketball, cooking, reading, and coding. He would love a full time job.
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
