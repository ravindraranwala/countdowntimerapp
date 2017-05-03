import {
    CREATE_TIMER, DELETE_TIMER
} from '../actions/types';

const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TIMER:
      // TODO: don't add duplicate timers with the same label.
      // TODO: check with the redux state tool and why it does not show up the state.
      console.log(state);
      return [...state, action.payload];
    case DELETE_TIMER:
      return state.filter(timer => timer.label != action.payload);
  }
  return state;
}
