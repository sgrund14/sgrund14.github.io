'use strict';

// maybe fix mobile rotate resize issue;
window.document.addEventListener('orientationchange', function() {
  var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (iOS && viewportmeta) {
    if (viewportmeta.content.match(/width=device-width/)) {
      viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=1');
    }
    viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=' + window.innerWidth);
  }
  // If you want to hide the address bar on orientation change, uncomment the next line
  // window.scrollTo(0, 0);
}, false);

const React = require('react');
const ReactDOM = require('react-dom');
require('../scss/main.scss');

const Home = require('./Home');

ReactDOM.render(
	<Home />,
    document.getElementById('app')
);
