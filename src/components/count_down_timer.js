import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTimer } from '../actions/index';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.state = { time: {}, seconds: props.seconds, label: props.label, initialValue: props.seconds, countdownState: "resume" };
    this.timer = 0;
    this.initValue = this.secondsToTime(this.state.initialValue);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onPauseResumeClick = this.onPauseResumeClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  onPauseResumeClick() {
    //: I prefer strings than boolean because it is more descriptive.
    var countdownState = this.state.countdownState;
    if( countdownState == "pause" ){
			countdownState = "resume";
      this.startTimer();
		} else{
			countdownState = "pause";
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
    });
  }

  onDeleteClick() {
    this.props.deleteTimer(this.state.label);
  }

  render() {
      return(
        <div>
          {this.state.label} <br />
          h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}
          <button
   					onClick={ this.onPauseResumeClick }>
   					{ this.state.countdownState == "pause" ? "Resume" : "Pause" }
   				</button>
          <button onClick={ this.onResetClick }>
            Reset
          </button>
          <button onClick={ this.onDeleteClick }>
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
