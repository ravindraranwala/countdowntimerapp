import {
    CREATE_TIMER
} from '../actions/types';

const INITIAL_STATE = { seconds: 0 };

export default function(state=INITIAL_STATE, action){
  switch (action.type) {
    case CREATE_TIMER:
      return { ...state, seconds: action.payload };;

  }
  return state;
}
