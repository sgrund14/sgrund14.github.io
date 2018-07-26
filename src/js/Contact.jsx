'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Contact = ({ hideAll, onContact, onSettings }) => {
	return (
		<div className={`${!hideAll && onContact && !onSettings ? 'section-on' : ''} contact-section`}>
			<div className='top-panel top-color'>
				<div className='panel upper contact'>
					<a className="btn media-link" id="github-btn" href='https://github.com/sgrund14' target='_blank'>github</a>
					<a className="btn media-link" id="arena-btn" href='https://www.are.na/samuel-grund/channels' target='_blank'>are.na</a>
					<a href="https://www.twitter.com/gruno14" className="btn media-link" target="_blank">twitter</a>
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel lower contact'>
					<a href="https://www.instagram.com/gruno14" className="btn media-link" target="_blank">instagram</a>
					<a className="btn media-link" id="behance-btn" href='https://www.behance.net/sgrund' target='_blank'>behance</a>
					<a className="btn media-link" id="linkedin-btn" href='https://www.linkedin.com/in/samuel-grund-2a7481108' target='_blank'>linkedin</a>
				</div>
			</div>
		</div>
	);
};

Contact.propTypes = {
	hideAll: PropTypes.bool,
	onContact: PropTypes.bool,
	onSettings: PropTypes.bool
};

module.exports = Contact;
