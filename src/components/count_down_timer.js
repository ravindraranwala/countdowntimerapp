import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTimer } from '../actions/index';
import * as constants from './constants';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.state = { time: {}, seconds: props.seconds, label: props.label, initialValue: props.seconds, countdownState: constants.RESUME };
    this.timer = 0;
    this.initValue = this.secondsToTime(this.state.initialValue);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onPauseResumeClick = this.onPauseResumeClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisorForMinutes = secs % (60 * 60);
    let minutes = Math.floor(divisorForMinutes / 60);

    let divisorForSeconds = divisorForMinutes % 60;
    let seconds = Math.ceil(divisorForSeconds);

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
    let seconds = this.state.initialValue;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
      countdownState: constants.RESUME
    });

    if (this.state.countdownState == constants.PAUSE) {
      // If the timer is currently clered make sure we start it up back again.
      this.startTimer();
    }
  }

  onDeleteClick() {
    this.props.deleteTimer(this.state.label);
  }

  render() {
      return(
        <div>
          {this.state.label} <br />
          h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}
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
