'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { CirclePicker } = require('react-color');
const sectionArray = ['home', 'info', 'work', 'contact'];
const lightColors = [

];
const darkColors = [

];

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			circleSize: '14',
			circleSpacing: '14',
			pickerWidth: '150'
		};
		// media query for resizing color picker
		this.WidthChange = this.WidthChange.bind(this);
		this.mq = window.matchMedia("(max-width: 480px)");
	}
	WidthChange(mq) {
		if (mq.matches) {
			this.setState({circleSpacing: '7'});
		} else {
			this.setState({circleSpacing: '14'});
		}
	}
	componentDidMount() {
		this.WidthChange(this.mq);
		this.mq.addListener(this.WidthChange);
	}

	render() {
		const {
			currentColors,
			currentSection,
			onSettings,
			onCircleHover,
			onCircleSelect,
			onBackgroundHover,
			onBackgroundSelect,
			navigate
		} = this.props;
		const canNavigateRight = sectionArray.indexOf(currentSection) !== sectionArray.length - 1;
		const canNavigateLeft = sectionArray.indexOf(currentSection) !== 0;
		return (
			<div className={`${onSettings ? 'section-on' : ''} settings-section`}>
				<div className='top-settings'>
					<div className='settings-header'>
						<i
							className={`${canNavigateLeft ? 'settings-arrow-active' : 'settings-arrow-disabled'} settings-arrow-left fa fa-chevron-left`}
							onClick={() => {
								if (canNavigateLeft) {
									const navigateTo = sectionArray.indexOf(currentSection) - 1;
									navigate(sectionArray[navigateTo]);
								}
							}}
						/>
						<span>{currentSection}</span>
						<i
							className={`${canNavigateRight ? 'settings-arrow-active' : 'settings-arrow-disabled'} settings-arrow-right fa fa-chevron-right`}
							onClick={() => {
								if (canNavigateRight) {
									const navigateTo = sectionArray.indexOf(currentSection) + 1;
									navigate(sectionArray[navigateTo]);
								}
							}}
						/>
					</div>
					<div className='color-wrapper'>
						<div>
							<div className='circle-picker-text no-user-select'>
								<span>Circles</span>
								<svg className='circle-picker-circle' height="12" width="12">
								  <circle r="5" cx="6" cy="6" stroke="black" strokeWidth="1.5" fill={`${currentColors[`${currentSection}Top`]}`} />
								</svg>
							</div>
							<div className="selection-area">
								<div className="top-settings-overlay" />
								<CirclePicker
									circleSize={this.state.circleSize}
									circleSpacing={this.state.circleSpacing}
									width={this.state.pickerWidth}
									color={currentColors[`${currentSection}Top`]}
									onSwatchHover={(color, e) => {
										onCircleHover(color, 'Top');
									}}
									onChangeComplete={(color, e) => {
										onCircleSelect(color, 'Top');
									}}
									className='circle-picker'
								/>
							</div>
						</div>
						<div>
							<div className="circle-picker-text no-user-select">
								<span>Background</span>
								<svg className='circle-picker-circle' height="12" width="12">
								  <circle r="5" cx="6" cy="6" stroke="black" strokeWidth="1.5" fill={`${currentColors[`${currentSection}TopBackground`]}`} />
								</svg>
							</div>
							<div className="selection-area">
								<div className="top-settings-overlay" />
								<CirclePicker
									circleSize={this.state.circleSize}
									circleSpacing={this.state.circleSpacing}
									width={this.state.pickerWidth}
									color={currentColors[`${currentSection}TopBackground`]}
									onSwatchHover={(color, e) => {
										onBackgroundHover(color, 'Top');
									}}
									onChangeComplete={(color, e) => {
										onBackgroundSelect(color, 'Top');
									}}
									className='circle-picker'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='bottom-settings'>
					<div className='color-wrapper'>
						<div>
							<div className="circle-picker-text no-user-select">
								<span>Circles</span>
								<svg className='circle-picker-circle' height="12" width="12">
								  <circle r="5" cx="6" cy="6" stroke="white" strokeWidth="1.5" fill={`${currentColors[`${currentSection}Bottom`]}`} />
								</svg>
							</div>
							<div className="selection-area">
								<div className="bottom-settings-overlay" />
								<CirclePicker
									circleSize={this.state.circleSize}
									circleSpacing={this.state.circleSpacing}
									width={this.state.pickerWidth}
									color={currentColors[`${currentSection}Bottom`]}
									onSwatchHover={(color, e) => {
										onCircleHover(color, 'Bottom');
									}}
									onChangeComplete={(color, e) => {
										onCircleSelect(color, 'Bottom');
									}}
									className='circle-picker'
								/>
							</div>
						</div>
						<div>
							<div className="circle-picker-text no-user-select">
								<span>Background</span>
								<svg className='circle-picker-circle' height="12" width="12">
								  <circle r="5" cx="6" cy="6" stroke="white" strokeWidth="1.5" fill={`${currentColors[`${currentSection}BottomBackground`]}`} />
								</svg>
							</div>
							<div className="selection-area">
								<div className="bottom-settings-overlay" />
								<CirclePicker
									circleSize={this.state.circleSize}
									circleSpacing={this.state.circleSpacing}
									width={this.state.pickerWidth}
									color={currentColors[`${currentSection}BottomBackground`]}
									onSwatchHover={(color, e) => {
										onBackgroundHover(color, 'Bottom');
									}}
									onChangeComplete={(color, e) => {
										onBackgroundSelect(color, 'Bottom');
									}}
									className='circle-picker'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Settings.propTypes = {
	onSettings: PropTypes.bool,
	currentSection: PropTypes.string,
	currentColors: PropTypes.object,
	onCircleHover: PropTypes.func,
	onCircleSelect: PropTypes.func,
	onBackgroundHover: PropTypes.func,
	onBackgroundSelect: PropTypes.func,
	navigate: PropTypes.func
};

module.exports = Settings;
