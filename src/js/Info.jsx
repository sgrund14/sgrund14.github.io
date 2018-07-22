'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Info = ({ hideAll, onInfo, onSettings }) => {
	return (
		<div className={`${!hideAll && onInfo && !onSettings ? 'section-on' : ''} info-section`}>
			<div className='top-panel top-color'>
				<div className='panel info'>
					This website is the personal property of SAM GRUND. He built it and one day, when the time is right, he will destroy it.
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel info'>
					He lives and works in New York City as a front end engineer. Here is where his story begins...
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
