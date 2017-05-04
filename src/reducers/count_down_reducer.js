import _ from 'lodash';
import {
    CREATE_TIMER, DELETE_TIMER, UPDATE_STATE, COUNT_DOWN, RESET_TIMER
} from '../actions/types';

const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TIMER:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_TIMER:
      return _.omit(state, action.payload);
    case UPDATE_STATE:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], countdownState: action.payload.countdownState }};
    case COUNT_DOWN:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], remainingSeconds: action.payload.remainingSeconds }};
    case RESET_TIMER:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], remainingSeconds: action.payload.seconds }};
  }
  return state;
}
