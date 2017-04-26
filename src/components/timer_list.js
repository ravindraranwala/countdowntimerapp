import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountdownTimer from './count_down_timer.js';

class TimerIndex extends Component {
  constructor(props) {
    super(props);
    this.renderTimers = this.renderTimers.bind(this);
  }

  renderTimers() {
    return this.props.timers.map((timer) => {
      return (
        <li className="list-group-item" key={timer.label}>
            <CountdownTimer { ...timer } />
        </li>
      );
    });
  }

  render(){
  return (
    <div>
      <h3>Timers</h3>
      <ul className="list-group">
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
