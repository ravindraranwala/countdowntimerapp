import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { deleteTimer, updateState, countDown, resetTimer } from '../actions/index';
import CountdownTimer from './count_down_timer.js';
import * as constants from './constants';

class TimerIndex extends Component {
  constructor(props) {
    super(props);
    this.renderTimers = this.renderTimers.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  renderTimers() {
    return _.map(this.props.timers, timer => {
      return (
        <li key={timer.id}>
          <CountdownTimer { ...timer } onPauseResumeClick={this.props.updateState} onDeleteClick={this.props.deleteTimer}
            onCountDown={this.props.countDown} onResetClick={this.props.resetTimer} onCompletion={this.playAudio} />
        </li>
      );
    });
  }

  playAudio() {
    var audio = new Audio(constants.AUDIO_URL);
    audio.play();
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


export default connect(mapStateToProps, { deleteTimer, updateState, countDown, resetTimer })(TimerIndex);
