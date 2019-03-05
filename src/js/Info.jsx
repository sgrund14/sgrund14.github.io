'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Info = ({ hideAll, onInfo, onSettings }) => {
	return (
		<div className={`${!hideAll && onInfo && !onSettings ? 'section-on' : ''} info-section`}>
			<div className='top-panel top-color'>
				<div className='panel info'>
					This website is the unholy creation of SAM GRUND. He built it with future web technologies, amongst other things.
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel info'>
					He lives in Greenpoint Brooklyn with Jack Ferguson and works as a front end engineer. Here is where his story begins...
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
