import React from "react";

export default class Contact extends React.Component {

	render() {
		return (
			<div>
				<div className="top-panel off">
					<div className="panel upper contact">
						<h2>email</h2>
						sgrund@oberlin.edu
						<br />
						<h2>twitter</h2>
						@salt_pepper_boi
					</div>
				</div>
				<div className="bottom-panel off">
					<div className="panel lower contact">
						<a href="../files/resume_april_2017.pdf" className="resume" target="_blank">resume</a>
					</div>
				</div>
			</div>
			);
	}
}