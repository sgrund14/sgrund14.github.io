import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Home from "./pages/Home.jsx";
import Info from "./pages/Info.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Home}>
			<Route path="info" component={Info}></Route>
			<Route path="work" component={Work}></Route>
			<Route path="contact" component={Contact}></Route>
		</Route>
	</Router>,
    document.getElementById('app')
    );