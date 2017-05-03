import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTimer } from '../actions/index';
import * as constants from './constants';
import jquery from 'jquery';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.state = { time: {}, seconds: props.seconds, label: props.label, initialValue: props.seconds, countdownState: props.countdownState, id: props.id };
    this.timer = 0;
    this.initValue = this.secondsToTime(this.state.initialValue);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onPauseResumeClick = this.onPauseResumeClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.handleFlipClockImage = this.handleFlipClockImage.bind(this);
  }

  secondsToTime(secs) {
    let hours = `${constants.ZERO}${Math.floor(secs / (60 * 60))}`.slice(-2);

    let divisorForMinutes = secs % (60 * 60);
    let minutes = `${constants.ZERO}${Math.floor(divisorForMinutes / 60)}`.slice(-2);

    let divisorForSeconds = divisorForMinutes % 60;
    let seconds = `${constants.ZERO}${Math.ceil(divisorForSeconds)}`.slice(-2);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  playAudio(file){
    var audio = new Audio(file);
    audio.play();
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      // Play the audio file first.
      this.playAudio(constants.AUDIO_URL);
      // call the onCompletion handler here.
      clearInterval(this.timer);
    }
  }

  onPauseResumeClick() {
    //: I prefer strings than boolean because it is more descriptive.
    var countdownState = this.state.countdownState;
    if( countdownState == constants.PAUSE ){
			countdownState = constants.RESUME;
      this.startTimer();
		} else{
			countdownState = constants.PAUSE;
      clearInterval(this.timer);
		}
		this.setState( {
			countdownState
    } );
  }

  onResetClick() {
    clearInterval(this.timer);
    let seconds = this.state.initialValue;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds,
      countdownState: constants.RESUME
    });

      // If the timer is currently cleared make sure we start it up back again.
      this.startTimer();
  }

  onDeleteClick() {
    this.props.deleteTimer(this.state.id);
  }

  handleFlipClockImage = () => {
    var myObj = this.state.time;

    Object.keys(myObj).forEach(key => {
      let obj = myObj[key];
      // do something with obj
      var digits = obj.split(constants.EMPTY_SPACE_CHAR);
      digits.forEach((digit, index) => {
        jquery(`#${this.state.label}${key}${index}`).css({backgroundPosition: -digit*50 });
      });
    });
  }

  render() {
      let borderClass = this.state.seconds === 0 ? "li-border" : constants.EMPTY_SPACE_CHAR;
      {this.handleFlipClockImage()};
      return(
        <div className={`list-group-item col-md-5 li-space ${borderClass}`}>
          <div>{this.state.label}</div>

          <span className="digit-display" id={this.state.label + "h0"}></span>
          <span className="digit-display"  id={this.state.label + "h1"}></span>

          <span className="digit-display"  id={this.state.label + "m0"}></span>
          <span className="digit-display"  id={this.state.label + "m1"}></span>

          <span className="digit-display"  id={this.state.label + "s0"}></span>
          <span className="digit-display"  id={this.state.label + "s1"}></span>

          <button className="btn btn-info btn-space btn-sm"
   					onClick={ this.onPauseResumeClick }>
   					{ this.state.countdownState == constants.PAUSE ? constants.RESUME : constants.PAUSE }
   				</button>
          <button className="btn btn-warning btn-space btn-sm" onClick={ this.onResetClick }>
            Reset
          </button>
          <button className="btn btn-danger btn-space btn-sm" onClick={ this.onDeleteClick }>
            Delete
          </button>
        </div>
      );
  }
}

function mapStateToProps(state){
  return { timers: state.timers };
}

export default connect(mapStateToProps, { deleteTimer })(CountdownTimer);
