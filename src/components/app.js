import React, { Component } from 'react';
import TimerList from '../containers/timer_list.js';
import TimerNew from '../containers/timer_new.js';

export default class App extends Component {
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
