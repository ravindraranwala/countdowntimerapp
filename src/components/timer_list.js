import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CountdownTimer from './count_down_timer.js';

class TimerIndex extends Component {
  constructor(props) {
    super(props);
    this.renderTimers = this.renderTimers.bind(this);
  }

  renderTimers() {
      console.log("Rendering timers here !");
      console.log("All the timers: " + JSON.stringify(this.props.timers));
    return _.map(this.props.timers, timer => {
      console.log(JSON.stringify(timer));
      return (
        <li key={timer.id}>
            <CountdownTimer { ...timer } />
        </li>
      );
    });
  }

  render(){
  return (
    <div>
      <h3>Timers</h3>
      <ul className="list-group row timer-list">
        { this.renderTimers() }
      </ul>
    </div>
  );
  }
}

function mapStateToProps(state){
  return { timers: state.timers };
}

export default connect(mapStateToProps)(TimerIndex);
