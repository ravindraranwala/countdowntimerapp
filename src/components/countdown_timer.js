import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCountdownClock from 'react-countdown-clock';

class CountdownTimer extends Component {
    render(){
      console.log(this.props.seconds);
      if (this.props.seconds) {
        return (
          <div>
            <ReactCountdownClock seconds={this.props.seconds}
                         color="#000"
                         alpha={0.9}
                         size={300}
                         onComplete={this.timerCompleted} />
          </div>
      );
      }
      return <label>Please enter a valid value</label>
  }
}

function mapStateToProps(state){
  return { seconds: state.createTimer.seconds };
}

export default connect(mapStateToProps)(CountdownTimer);
