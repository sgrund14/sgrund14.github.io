'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const MediaLink = require('./MediaLink');


const Contact = ({ hideAll, onContact, onSettings }) => {
	return (
		<div className={`${!hideAll && onContact && !onSettings ? 'section-on' : ''} contact-section`}>
			<div className='top-panel top-color'>
				<div className='panel upper contact'>
					<MediaLink link='https://github.com/sgrund14'>github</MediaLink>
					<MediaLink link='https://www.are.na/samuel-grund/channels'>are.na</MediaLink>
					<MediaLink link='https://www.twitter.com/gruno14'>twitter</MediaLink>
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel lower contact'>
					<MediaLink link='https://www.instagram.com/gruno14'>instagram</MediaLink>
					<MediaLink link='https://www.behance.net/sgrund'>behance</MediaLink>
					<MediaLink link='https://www.linkedin.com/in/samuel-grund-2a7481108'>linkedin</MediaLink>
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
