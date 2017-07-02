import React from "react";
import { Link } from "react-router";

export default class Home extends React.Component {
	navigate(url) {
		let btn = document.getElementById(url+'-button');
		if (btn.classList.contains('on')){
			this.props.history.replaceState(null, "/");
			btn.classList.remove('on');

		} else {
			let current = document.getElementsByClassName('on');
			if (current.length > 0) {
				current[0].classList.remove('on');
			}
			btn.classList.add('on');
			this.props.history.replaceState(null, url);
		}
	}

	render() {
		return (
			<div>

				<div className="bottomhalf"></div>
				<canvas resize="true" id="canvas"></canvas>
    			<canvas resize="true" id="canvas2"></canvas>

    			{this.props.children}

				<div className="row top">
					<ul className="buttons tabs">
						<h1 id="first-name">SAMUEL</h1>

						<p id="info-button" onClick={() => this.navigate("info")}>info</p>
						<p id="work-button" onClick={() => this.navigate("work")}>work</p>
						<p id="contact-button" onClick={() => this.navigate("contact")}>contact</p>
					</ul>
				</div>
				<div className="row bottom">
					<ul className="buttons links">
						<a href="https://github.com/sgrund14" id="github" target="_blank">github</a>
						<a href="https://www.linkedin.com/in/samuel-grund-2a7481108" id="linkedin" target="_blank">linkedin</a>
						<a href="https://www.behance.net/sgrund" id="behance" target="_blank">behance</a>
						<h1 id="last-name">GRUND
						</h1>
					</ul>
				</div>
				
			</div>
		);
	}
}