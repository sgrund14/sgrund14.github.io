const React = require('react');

const SettingsButton = ({ onSettings, handleClick, onMobile }) => {
	return (
		<span
			className={`${onSettings ? 'on' : ''} settings-button ${onMobile ? 'bottom' : 'top'}-color`}
			onClick={handleClick}
		>
			{onSettings ? "close settings" : "settings"}
		</span>
	);
};

module.exports = SettingsButton;
