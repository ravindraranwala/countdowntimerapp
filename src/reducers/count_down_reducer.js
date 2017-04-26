import {
    CREATE_TIMER
} from '../actions/types';

const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TIMER:
      console.log([...state  , action.payload ]);
      return [...state, action.payload];
  }
  return state;
}
