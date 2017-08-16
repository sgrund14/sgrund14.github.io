"use strict";

const React = require('react');
const { anim, colors } = require('../scripts/runAnim.jsx');

const Info = require('./Info.jsx');
const Work = require('./Work.jsx');
const Contact = require('./Contact.jsx');

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.paperArray = [];
		this.topAnim = {};
		this.bottomAnim = {};

		this.state = {
			currentSection: null
		};
	}
	componentDidMount() {
		this.topAnim = anim(this.paperArray, 0, document.getElementById('canvas'));
		this.bottomAnim = anim(this.paperArray, 1, document.getElementById('canvas2'));

		// runs animation. id refers to which canvas paper runs on: 0 for top, 1 for bottom.
		// canvasElement is the canvas to draw on
		this.paperArray[0].view.onFrame = this.topAnim.update(0);
		this.paperArray[1].view.onFrame = this.bottomAnim.update(1);

	}

	render() {
		return (
			<div>
				<div className='bottomhalf'></div>
				<canvas resize='true' id='canvas'></canvas>
    			<canvas resize='true' id='canvas2'></canvas>

    			<Info currentSection={this.state.currentSection}/>
    			<Work currentSection={this.state.currentSection}/>
    			<Contact currentSection={this.state.currentSection}/>

				<div className='row top'>
					<ul className='buttons tabs'>
						<h1 id='first-name'>SAMUEL</h1>
						<p
							className={this.state.currentSection === 'info' ? 'on' : ''}
							onClick={() => {
								if (this.state.currentSection !== 'info') {
									this.setState({ currentSection: 'info' });
								} else {
									this.setState({ currentSection: null });
								}
							}}
						>
						info
						</p>
						<p
							className={this.state.currentSection === 'work' ? 'on' : ''}
							onClick={() => {
								if (this.state.currentSection !== 'work') {
									this.setState({ currentSection: 'work' });
								} else {
									this.setState({ currentSection: null });
								}
							}}
						>
						work
						</p>
						<p
							className={this.state.currentSection === 'contact' ? 'on' : ''}
							onClick={() => {
								if (this.state.currentSection !== 'contact') {
									this.setState({ currentSection: 'contact' });
								} else {
									this.setState({ currentSection: null });
								}
							}}
						>
						contact
						</p>
					</ul>
				</div>
				<div className='row bottom'>
					<ul className='buttons links'>
						<a href='https://github.com/sgrund14' id='github' target='_blank'>github</a>
						<a href='https://www.linkedin.com/in/samuel-grund-2a7481108' id='linkedin' target='_blank'>linkedin</a>
						<a href='https://www.behance.net/sgrund' id='behance' target='_blank'>behance</a>
						<h1 id='last-name'>GRUND
						</h1>
					</ul>
				</div>
				
			</div>
		);
	}
}

module.exports = Home;
