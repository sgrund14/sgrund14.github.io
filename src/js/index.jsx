const React = require('react');
const ReactDOM = require('react-dom');
require('../scss/main.scss');

const Home = require('./Home');

ReactDOM.render(
	<Home />,
    document.getElementById('app')
);
