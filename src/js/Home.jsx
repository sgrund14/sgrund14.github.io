'use strict';

const React = require('react');
const { anim, changeBackgroundColor, possibleColors, initialCircleColors } = require('../helpers/animationHelper');

const Info = require('./Info');
const Work = require('./Work');
const Contact = require('./Contact');
const Settings = require('./Settings');
const SettingsButton = require('./SettingsButton');

// // default color settings
// const colorDefaults = {
// 	homeTop: '#ffe738', // yellow
//     homeBottom: '#bfbfbf', // lightgrey
//     infoTop: '#e5e6ff', // lightblue
//     infoBottom: '#000251', // darkblue
//     workTop: '#93ff99', // lightgreen
//     workBottom: '#6b0000', // darkred
//     contactTop: '#eaeaea', // lightergrey
//     contactBottom: '#3a3a3a', // darkgrey
//     homeTopBackground: '#ffffff',
//     homeBottomBackground: '000000',
//     infoTopBackground: '#ffffff',
//     infoBottomBackground: '000000',
//     workTopBackground: '#ffffff',
//     workBottomBackground: '000000',
//     contactTopBackground: '#ffffff',
//     contactBottomBackground: '000000'
// };

// default color settings
// randomize on load
const colorDefaults = {
	homeTop: initialCircleColors.top,
    homeBottom: initialCircleColors.bottom,
    bioTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    bioBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    homeTopBackground: '#ffffff',
    homeBottomBackground: '#000000',
    bioTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    bioBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)]
};

// "#38E4AE", // eucalyptus

const brightColors = [
	'#7EE8FA', '#80FF72', "#FFF07C",
	"#ED4D6E", "#B47AEA", "#38E4AE", // eucalyptus
	"#5F00BA", "#D6FF79", "#D6FF79"
];

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.paperArray = [];
		this.topAnim = null;
		this.bottomAnim = null;
		this.state = {
			colors: Object.assign({}, colorDefaults),
			currentSection: 'home',
			onSettings: false,
			hideAll: false,
			nameCounter: 0,
			onMobile: false
		};
		this.mq = window.matchMedia("(orientation: portrait)");
		this.getRandomColor = this.getRandomColor.bind(this);
		this.navigate = this.navigate.bind(this);
		this.closeSettings = this.closeSettings.bind(this);
		this.onCircleHover = this.onCircleHover.bind(this);
		this.onCircleSelect = this.onCircleSelect.bind(this);
		this.onBackgroundHover = this.onBackgroundHover.bind(this);
		this.onBackgroundSelect = this.onBackgroundSelect.bind(this);
		this.handleSettingsClick = this.handleSettingsClick.bind(this);

		this.nameHoverInterval = -1;

		document.documentElement.style.setProperty(`--top-circle-color`, `${colorDefaults.homeTop}`);
		document.documentElement.style.setProperty(`--bottom-circle-color`, `${colorDefaults.homeBottom}`);
	}
	/*
	* initialize animation as soon as canvas elements mount
	*
	*/
	componentDidMount() {
		if (this.mq.matches) {
			this.setState({ onMobile: true });
		}
		// runs animation. id refers to which canvas paper runs on: 0 for top, 1 for bottom.
		// canvasElement is the canvas to draw on
		this.topAnim = anim(this.paperArray, 0, document.getElementById('canvas'));
		this.bottomAnim = anim(this.paperArray, 1, document.getElementById('canvas2'));
		// this.closeSettings('home');
		this.paperArray[0].view.onFrame = this.topAnim.update(0);
		this.paperArray[1].view.onFrame = this.bottomAnim.update(1);
	}

	getRandomColor() {
		const { nameCounter } = this.state;
		this.setState({ nameCounter: nameCounter + 1 });
		return brightColors[this.state.nameCounter%9];
	}

	/*
	* @param section: section to navigate to
	* navigate site to provided page, change color as appropriate
	*
	*/
	navigate(section) {
		this.setState({ currentSection: section });
		const newHomeTopCircles = possibleColors[Math.floor(Math.random()*possibleColors.length)];
		const newHomeBottomCircles = possibleColors[Math.floor(Math.random()*possibleColors.length)];
		const newHomeTopBG = possibleColors[Math.floor(Math.random()*possibleColors.length)];
		const newHomeBottomBG = possibleColors[Math.floor(Math.random()*possibleColors.length)];
		const newColors = Object.assign({}, this.state.colors, {
			homeTop: newHomeTopCircles,
			homeBottom: newHomeBottomCircles,
			homeTopBackground: newHomeTopBG,
			homeBottomBackground: newHomeBottomBG
		});
		if (section === 'home') {
			this.setState({
				colors: newColors
			})
		}
		this.mq = window.matchMedia("(orientation: portrait)");
		this.topAnim.colorChange(section === 'home' ? newHomeTopCircles : this.state.colors[`${section}Top`], 'top');
		this.bottomAnim.colorChange(section === 'home' ? newHomeBottomCircles : this.state.colors[`${section}Bottom`], 'bottom');
		changeBackgroundColor(section === 'home' ? newHomeTopBG : this.state.colors[`${section}TopBackground`], 'body');
		changeBackgroundColor(section === 'home' ? newHomeBottomBG : this.state.colors[`${section}BottomBackground`], 'bottomhalf');
	}
	/*
	* @param section: section you were on when you opened up settings
	* accomplishes the same thing as `navigate`, but doesn't effect the speed of the circles
	* resets circles colors to set colors, reopens menu
	*/
	closeSettings(section) {
		this.setState({ currentSection: section });
		this.topAnim.colorChangeSettings(this.state.colors[`${section}Top`], 'top');
		this.bottomAnim.colorChangeSettings(this.state.colors[`${section}Bottom`], 'bottom');
		changeBackgroundColor(this.state.colors[`${section}TopBackground`], 'body');
		changeBackgroundColor(this.state.colors[`${section}BottomBackground`], 'bottomhalf');
	}
	/*
	* @param color: color of the current circle being hovered over
	* @param area: which settings menu you are interacting with (top or bottom)
	* change color of circles in designated area to preview the color change
	*
	*/
	onCircleHover(color, area) {
		switch (area) {
			case 'Top':
				this.topAnim.colorChangeSettings(color.hex, 'top');
				break;
			case 'Bottom':
				this.bottomAnim.colorChangeSettings(color.hex, 'bottom');
				break;
			default:
				break;
		}
	}
	/*
	* @param color: color selected in settings menu
	* @param area: which settings menu you are interacting with (top or bottom)
	* sets circle color of the current section, so it is permanently that color when navigating menus
	*
	*/
	onCircleSelect(color, area) {
		const newColors = Object.assign({}, this.state.colors, { [`${this.state.currentSection}${area}`]: color.hex });
		this.setState({ colors: newColors });
	}
	/*
	* @param color: color of the current circle being hovered over
	* @param area: which settings menu you are interacting with (top or bottom)
	* change color of background in designated area to preview the color change
	*
	*/
	onBackgroundHover(color, area) {
		const section = area === 'Top' ? 'body' : 'bottomhalf';
		changeBackgroundColor(color.hex, section);
	}
	/*
	* @param color: color selected in settings menu
	* @param area: which settings menu you are interacting with (top or bottom)
	* sets background color of the current section, so it is permanently that color when navigating menus
	*
	*/
	onBackgroundSelect(color, area) {
		const newColors = Object.assign({}, this.state.colors, { [`${this.state.currentSection}${area}Background`]: color.hex });
		this.setState({ colors: newColors });
	}

	handleSettingsClick() {
		this.setState({ onSettings: !this.state.onSettings });
		if (this.state.onSettings) {
			this.closeSettings(this.state.currentSection);	
		}
	}

	render() {
		const { currentSection, onSettings, hideAll, onMobile } = this.state;
		const onInfo = currentSection === 'bio';
		const onWork = currentSection === 'work';
		const onContact = currentSection === 'contact';
		return (
			<div>
				{/* render black background for bottom half, top and bottom canvases for animation*/}
				<div id='bottomhalf' />
				<canvas data-paper-resize id='canvas' />
				<canvas data-paper-resize id='canvas2' />

    			<Info hideAll={hideAll} onInfo={onInfo} onSettings={onSettings} />
    			<Work hideAll={hideAll} onWork={onWork} onSettings={onSettings} />
    			<Contact
    				currentColors={this.state.colors}
    				hideAll={hideAll}
    				onContact={onContact}
    				onSettings={onSettings}
    			/>
    			<Settings
    				currentColors={this.state.colors}
    				currentSection={this.state.currentSection}
    				onSettings={onSettings}
    				onCircleHover={this.onCircleHover}
    				onCircleSelect={this.onCircleSelect}
    				onBackgroundHover={this.onBackgroundHover}
    				onBackgroundSelect={this.onBackgroundSelect}
    				navigate={this.navigate}
    			/>

    			<div className="home-section section-on">
    				<div className="top-row-wrapper">
    					{!onMobile && <div className="empty-top-col"></div>}
						<div className='row top top-color'>
							<span
	    						className="my-name top-color"
	    						onClick={() => this.navigate('home')}
	    						onMouseEnter={() => {
	    							this.nameHoverInterval = setInterval(() => {
	    								document.documentElement.style.setProperty(`--not-so-random-color`, `${this.getRandomColor()}`);
	    							}, 300);
	    						}}
	    						onMouseLeave={() => clearInterval(this.nameHoverInterval)}
	    					>
	    						Sam Grund
	    					</span>
							<ul className='buttons tabs'>
								<span
									id="info-btn"
									className={`btn ${onInfo ? 'on' : ''}`}
									onClick={() => this.navigate(onInfo ? 'home' : 'bio')}
								>
									bio
								</span>
								<span
									id="work-btn"
									className={`btn ${onWork ? 'on' : ''}`}
									onClick={() => this.navigate(onWork ? 'home' : 'work')}
								>
									work
								</span>
								<span
									id="contact-btn"
									className={`btn contact-btn ${onContact ? 'on' : ''}`}
									onClick={() => this.navigate(onContact ? 'home' : 'contact')}
								>
									contact
								</span>
							</ul>
						</div>
						{!onMobile &&
							<SettingsButton onMobile={onMobile} handleClick={this.handleSettingsClick} onSettings={onSettings} />
						}
					</div>
					<div className="bottom-row-wrapper">
						<span className="updated-on bottom-color">7/26/18</span>
						{onMobile &&
							<SettingsButton onMobile={onMobile} handleClick={this.handleSettingsClick} onSettings={onSettings} />
						}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Home;
