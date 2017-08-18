"use strict";

const React = require('react');
const { anim } = require('../helpers/startAnimation');

const Info = require('./Info');
const Work = require('./Work');
const Contact = require('./Contact');

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.paperArray = [];
		this.topAnim = {};
		this.bottomAnim = {};
		this.colors = {
		    homeTop: '#ffe738', // yellow
		    homeBottom: '#bfbfbf', // lightgrey
		    infoTop: '#e5e6ff', // lightblue
		    infoBottom: '#000251', // darkblue
		    workTop: '#93ff99', // lightgreen
		    workBottom: '#6b0000', // darkred
		    contactTop: '#eaeaea', // lightergrey
		    contactBottom: '#3a3a3a', // dark grey
		};
		this.state = {
			currentSection: null
		};

		this.navigateHome = this.navigateHome.bind(this);
		this.navigate = this.navigate.bind(this);
	}
	componentDidMount() {
		this.topAnim = anim(this.paperArray, 0, document.getElementById('canvas'));
		this.bottomAnim = anim(this.paperArray, 1, document.getElementById('canvas2'));

		// runs animation. id refers to which canvas paper runs on: 0 for top, 1 for bottom.
		// canvasElement is the canvas to draw on
		this.paperArray[0].view.onFrame = this.topAnim.update(0);
		this.paperArray[1].view.onFrame = this.bottomAnim.update(1);

	}

	navigateHome() {
		this.setState({ currentSection: null });
		this.topAnim.colorChange(this.colors.homeTop);
		this.bottomAnim.colorChange(this.colors.homeBottom);
	}

	navigate(section) {
		this.setState({ currentSection: section });
		this.topAnim.colorChange(this.colors[`${section}Top`]);
		this.bottomAnim.colorChange(this.colors[`${section}Bottom`]);
	}

	render() {
		const { currentSection } = this.state;
		const onInfo = currentSection === 'info';
		const onWork = currentSection === 'work';
		const onContact = currentSection === 'contact';
		return (
			<div>
				<div class='bottomhalf'></div>
				<canvas data-paper-resize id='canvas'></canvas>
				<canvas data-paper-resize id='canvas2'></canvas>
    			<Info currentSection={currentSection} />
    			<Work currentSection={currentSection} />
    			<Contact currentSection={currentSection} />

				<div className='row top'>
					<ul className='buttons tabs'>
						<h1 id='first-name'>SAMUEL</h1>
						<p
							className={onInfo ? 'on' : ''}
							onClick={onInfo ? this.navigateHome : () => this.navigate('info')}
						>
						info
						</p>
						<p
							className={onWork ? 'on' : ''}
							onClick={onWork ? this.navigateHome : () => this.navigate('work')}
						>
						work
						</p>
						<p
							className={onContact ? 'on' : ''}
							onClick={onContact ? this.navigateHome : () => this.navigate('contact')}
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
