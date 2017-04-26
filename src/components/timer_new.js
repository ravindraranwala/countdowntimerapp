import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createTimer } from '../actions/index';

class TimerNew extends Component {

onSubmit(props){
  this.props.createTimer(props);
}

  render() {
  const { fields: { hours, minutes, seconds, label }, handleSubmit } = this.props;
  return (
    <form onSubmit={handleSubmit(this.props.createTimer)}>
      <h3>Create A New Timer</h3>
      <div className={`form-group ${hours.touched && hours.invalid ? 'has-danger' : ''}`}>
        <label>Hours</label>
        <input type="text" className="form-control" {...hours} />
        <div className="text-help">
          {hours.touched ? hours.error : ''}
        </div>
      </div>
      <div className={`form-group ${minutes.touched && minutes.invalid ? 'has-danger' : ''}`}>
        <label>Minutes</label>
        <input type="text" className="form-control" {...minutes} />
        <div className="text-help">
          {minutes.touched ? minutes.error : ''}
        </div>
      </div>
      <div className={`form-group ${seconds.touched && seconds.invalid ? 'has-danger' : ''}`}>
        <label>Seconds</label>
        <input type="text" className="form-control" {...seconds} />
        <div className="text-help">
          {seconds.touched ? seconds.error : ''}
        </div>
      </div>
      <div className={`form-group ${label.touched && label.invalid ? 'has-danger' : ''}`}>
        <label>Label</label>
        <input type="text" className="form-control" {...label} />
        <div className="text-help">
          {label.touched ? label.error : ''}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
  }
}

function validate(values) {
  const errors = {};

  if (!values.hours) {
    errors.title = 'Enter hours';
  }
  if (!values.minutes) {
    errors.categories = 'Enter minutes';
  }
  if (!values.seconds) {
    errors.content = 'Enter seconds';
  }
  if (!values.label) {
    errors.content = 'Enter label';
  }
  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'TimerNewForm',
  fields: ['hours', 'minutes', 'seconds', 'label'],
  validate
}, null, { createTimer })(TimerNew);
