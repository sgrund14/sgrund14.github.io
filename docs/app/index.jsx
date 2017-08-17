const React = require('react');
const ReactDOM = require('react-dom');
require('../styles/main.scss');

const Home = require ('./Home.jsx');

ReactDOM.render(
	<Home />,
    document.getElementById('app')
);
