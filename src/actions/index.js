
import {
    CREATE_TIMER, DELETE_TIMER
} from './types';

export function createTimer(props) {
  let seconds = (+props.hours) * 60 * 60 + (+props.minutes) * 60 + (+props.seconds);
  return {
    type: CREATE_TIMER,
    payload: { label: props.label, seconds: seconds }
  };
}

export function deleteTimer(label) {
  return {
    type: DELETE_TIMER,
    payload: label
  }
}
