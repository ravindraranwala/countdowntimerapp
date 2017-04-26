import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createTimerReducer from './count_down_reducer';

const rootReducer = combineReducers({
  timers: createTimerReducer,
  form: formReducer
});

export default rootReducer;
