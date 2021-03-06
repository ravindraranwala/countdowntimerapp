
import uuidV4 from 'uuid/v4';
import * as constants from '../components/constants';
import {
    CREATE_TIMER, DELETE_TIMER, UPDATE_STATE, COUNT_DOWN, RESET_TIMER
} from './types';

export function createTimer(props) {
  let seconds = Number.parseInt(props.hours) * 60 * 60 + Number.parseInt(props.minutes) * 60 + Number.parseInt(props.seconds);
  return {
    type: CREATE_TIMER,
    payload: { id: uuidV4(), label: props.label, seconds: seconds, remainingSeconds: seconds, countdownState: constants.RESUME }
  };
}

export function deleteTimer(id) {
  return {
    type: DELETE_TIMER,
    payload: id
  };
}

export function updateState(id, newState) {
  return {
    type: UPDATE_STATE,
    payload: { id: id, countdownState: newState }
  };
}

export function countDown(id, remainingSeconds) {
  return {
    type: COUNT_DOWN,
    payload: { id: id, remainingSeconds: --remainingSeconds }
  };
}

export function resetTimer(id, seconds) {
  return {
    type: RESET_TIMER,
    payload: { id: id, remainingSeconds: seconds }
  };
}
