import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.state = { time: {}, seconds: props.seconds, label: props.label, initialValue: props.seconds };
    this.timer = 0;
    console.log(this.state.initialValue);
    this.initValue = this.secondsToTime(this.state.initialValue);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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

  render() {
      return(
        <div>
          {this.state.label} <br />
          h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}
        </div>
      );
  }
}

export default CountdownTimer;
