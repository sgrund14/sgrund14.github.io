'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const Contact = ({ hideAll, onContact, onSettings }) => {
	return (
		<div className={`${!hideAll && onContact && !onSettings ? 'section-on' : ''} contact-section`}>
			<div className='top-panel top-color'>
				<div className='panel upper contact'>
					<h2>email</h2>
					saltpeppergames@gmail.com
					<br />
				</div>
			</div>
			<div className='bottom-panel bottom-color'>
				<div className='panel lower contact'>
					<h2>twitter + instagram</h2>
					@gruno14
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
