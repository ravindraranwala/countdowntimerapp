import React, { Component } from 'react';
import CountdownTimer from './countdown_timer.js';
import TimerNew from './timer_new.js';

export default class App extends Component {
  timerCompleted(){
    console.log("Timer Completed !");
  }

  render() {
    return (
      <div>
        <TimerNew />
        <CountdownTimer />
      </div>
    );
  }
}
