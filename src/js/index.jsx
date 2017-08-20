'use strict';

// maybe this hides the address bar
window.addEventListener("load", function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

const React = require('react');
const ReactDOM = require('react-dom');
require('../scss/main.scss');

const Home = require('./Home');

ReactDOM.render(
	<Home />,
    document.getElementById('app')
);
