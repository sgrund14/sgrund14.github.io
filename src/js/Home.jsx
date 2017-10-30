'use strict';

const React = require('react');
const { anim, changeBackgroundColor, possibleColors, initialCircleColors } = require('../helpers/animationHelper');

const Info = require('./Info');
const Work = require('./Work');
const Contact = require('./Contact');
const Settings = require('./Settings');

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
    infoTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    infoBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactTop: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactBottom: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    homeTopBackground: '#ffffff',
    homeBottomBackground: '#000000',
    infoTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    infoBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    workBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactTopBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)],
    contactBottomBackground: possibleColors[Math.floor(Math.random()*possibleColors.length)]
};

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
			hideAll: false
		};
		this.navigate = this.navigate.bind(this);
		this.closeSettings = this.closeSettings.bind(this);
		this.onCircleHover = this.onCircleHover.bind(this);
		this.onCircleSelect = this.onCircleSelect.bind(this);
		this.onBackgroundHover = this.onBackgroundHover.bind(this);
		this.onBackgroundSelect = this.onBackgroundSelect.bind(this);
	}
	/*
	* initialize animation as soon as canvas elements mount
	*
	*/
	componentDidMount() {
		// runs animation. id refers to which canvas paper runs on: 0 for top, 1 for bottom.
		// canvasElement is the canvas to draw on
		this.topAnim = anim(this.paperArray, 0, document.getElementById('canvas'));
		this.bottomAnim = anim(this.paperArray, 1, document.getElementById('canvas2'));
		// this.closeSettings('home');
		this.paperArray[0].view.onFrame = this.topAnim.update(0);
		this.paperArray[1].view.onFrame = this.bottomAnim.update(1);
	}

	/*
	* @param section: section to navigate to
	* navigate site to provided page, change color as appropriate
	*
	*/
	navigate(section) {
		this.setState({ currentSection: section });
		this.topAnim.colorChange(this.state.colors[`${section}Top`]);
		this.bottomAnim.colorChange(this.state.colors[`${section}Bottom`]);
		changeBackgroundColor(this.state.colors[`${section}TopBackground`], 'body');
		changeBackgroundColor(this.state.colors[`${section}BottomBackground`], 'bottomhalf');
	}
	/*
	* @param section: section you were on when you opened up settings
	* accomplishes the same thing as `navigate`, but doesn't effect the speed of the circles
	* resets circles colors to set colors, reopens menu
	*/
	closeSettings(section) {
		this.setState({ currentSection: section });
		this.topAnim.colorChangeSettings(this.state.colors[`${section}Top`]);
		this.bottomAnim.colorChangeSettings(this.state.colors[`${section}Bottom`]);
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
				this.topAnim.colorChangeSettings(color.hex);
				break;
			case 'Bottom':
				this.bottomAnim.colorChangeSettings(color.hex);
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

	render() {
		const { currentSection, onSettings, hideAll } = this.state;
		const onInfo = currentSection === 'info';
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
    			<Contact hideAll={hideAll} onContact={onContact} onSettings={onSettings} />
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

    			<div className={`${onSettings || hideAll ? '' : 'section-on'} home-section`}>
					<div className='row top top-color'>
						<ul className='buttons tabs'>
							<h1 id='first-name'>SAMUEL</h1>
							<p
								className={onInfo ? 'on' : ''}
								onClick={() => this.navigate(onInfo ? 'home' : 'info')}
							>
							info
							</p>
							<p
								className={onWork ? 'on' : ''}
								onClick={() => this.navigate(onWork ? 'home' : 'work')}
							>
							work
							</p>
							<p
								className={`contact-btn ${onContact ? 'on' : ''}`}
								onClick={() => this.navigate(onContact ? 'home' : 'contact')}
							>
							contact
							</p>
						</ul>
					</div>
					<div className='row bottom bottom-color'>
						<ul className='buttons links'>
							<a href='https://github.com/sgrund14' id='github' target='_blank'>github</a>
							<a href='https://www.linkedin.com/in/samuel-grund-2a7481108' id='linkedin' target='_blank'>linkedin</a>
							<a href='https://www.behance.net/sgrund' id='behance' target='_blank'>behance</a>
							<h1 id='last-name'>GRUND
							</h1>
						</ul>
					</div>
				</div>

				<div className="top-color">
					<i
						className={`settings-button fa ${onSettings ? 'fa-times' : 'fa-gear'}`}
						onClick={() => {
							this.setState({ onSettings: !onSettings });
							if (onSettings) {
								this.closeSettings(this.state.currentSection);	
							}
						}}
					/>
					{!onSettings &&
						<i
							className={`hide-all-button fa ${hideAll ? 'fa-plus-square-o' : 'fa-minus-square-o'}`}
							onClick={() => {
								this.setState({ hideAll: !hideAll });
							}}
						/>
					}
				</div>
				
			</div>
		);
	}
}

module.exports = Home;
