import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from './constants';
import jquery from 'jquery';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onPauseResumeClick = this.onPauseResumeClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(this.countDown, constants.INTERVAL);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    this.props.onCountDown(this.props.id, this.props.remainingSeconds, this.props.seconds);

    // Check if we're at zero.
    if (this.props.remainingSeconds == 0) {
      // Play the onCompletion callback first.
      this.props.onCompletion();
      // call the onCompletion handler here.
      clearInterval(this.timer);
    }
  }

  onPauseResumeClick() {
    //: I prefer strings than boolean because it is more descriptive.
    if( this.props.countdownState == constants.PAUSE ){
			this.props.onPauseResumeClick(this.props.id, constants.RESUME);
      this.startTimer();
		} else{
      this.props.onPauseResumeClick(this.props.id, constants.PAUSE);
      clearInterval(this.timer);
		}
  }

  onResetClick() {
    clearInterval(this.timer);
    this.props.onResetClick(this.props.id, this.props.remainingSeconds, this.props.seconds);

      // If the timer is currently cleared make sure we start it up back again.
      this.startTimer();
  }

  onDeleteClick() {
    this.props.onDeleteClick(this.props.id);
  }

  handleFlipClockImage = () => {
    var myObj = this.secondsToTime(this.props.remainingSeconds);

    Object.keys(myObj).forEach(key => {
      let obj = myObj[key];
      // do something with obj
      var digits = obj.split(constants.EMPTY_SPACE_CHAR);
      digits.forEach((digit, index) => {
        console.log(key+index + " : " + digit);
        jquery(`#${this.props.label}${key}${index}`).css({backgroundPosition: -digit*50 });
      });
    });
  }

  render() {
      let borderClass = this.props.remainingSeconds === 0 ? "li-border" : constants.EMPTY_SPACE_CHAR;
      {this.handleFlipClockImage()};
      return(
        <div className={`list-group-item col-md-5 li-space ${borderClass}`}>
          <div>{this.props.label}</div>

          <span className="digit-display" id={this.props.label + "h0"}></span>
          <span className="digit-display"  id={this.props.label + "h1"}></span>

          <span className="digit-display"  id={this.props.label + "m0"}></span>
          <span className="digit-display"  id={this.props.label + "m1"}></span>

          <span className="digit-display"  id={this.props.label + "s0"}></span>
          <span className="digit-display"  id={this.props.label + "s1"}></span>

          <button className="btn btn-info btn-space btn-sm"
   					onClick={ this.onPauseResumeClick }>
   					{ this.props.countdownState == constants.PAUSE ? constants.RESUME : constants.PAUSE }
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

export default CountdownTimer;
