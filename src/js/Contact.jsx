'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Contact = ({ onContact, onSettings }) => {
	return (
		<div className={`${onContact && !onSettings ? 'section-on' : ''} contact-section`}>
			<div className='top-panel'>
				<div className='panel upper contact'>
					<h2>email</h2>
					sgrund@oberlin.edu
					<br />
					<h2>twitter</h2>
					@salt_and_pepper_games
				</div>
			</div>
			<div className='bottom-panel'>
				<div className='panel lower contact'>
					<a href='src/files/resume_august_2017.pdf' className='resume' target='_blank'>resume</a>
				</div>
			</div>
		</div>
	);
};

Contact.propTypes = {
	onContact: PropTypes.bool,
	onSettings: PropTypes.bool
};

module.exports = Contact;
