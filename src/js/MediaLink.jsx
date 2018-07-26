const React = require('react');
const PropTypes = require('prop-types');

const MediaLink = ({ link, children }) => {
	return (
		<a
			className="btn media-link"
			href={link}
			target='_blank'
		>
			{children}
		</a>
	);
};

// MediaLink.propTypes = {
// 	link: PropTypes.string,
// 	children: PropTypes.string
// };

module.exports = MediaLink;
