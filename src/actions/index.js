
import uuidV4 from 'uuid/v4';
import * as constants from '../components/constants';
import {
    CREATE_TIMER, DELETE_TIMER
} from './types';

export function createTimer(props) {
  // TODO: check whether we can improve this string => number conversion.
  let seconds = (+props.hours) * 60 * 60 + (+props.minutes) * 60 + (+props.seconds);
  // console.log(uuidV4());
  return {
    type: CREATE_TIMER,
    payload: { id: uuidV4(), label: props.label, seconds: seconds, countdownState: constants.RESUME }
  };
}

export function deleteTimer(label) {
  return {
    type: DELETE_TIMER,
    payload: label
  }
}
