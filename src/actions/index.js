
import {
    CREATE_TIMER
} from './types';

export function createTimer(props) {
  console.log(props.hours);
  return {
    type: CREATE_TIMER,
    payload: (+props.hours) * 60 * 60 + (+props.minutes) * 60 + (+props.seconds)
  };
}
