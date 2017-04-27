import React, { Component } from 'react';
import TimerList from './timer_list.js';
import TimerNew from './timer_new.js';

export default class App extends Component {
  timerCompleted(){
    console.log("Timer Completed !");
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
            <TimerNew />
        </div>
        <div className="col-md-10">
            <TimerList />
        </div>
      </div>
    );
  }
}
