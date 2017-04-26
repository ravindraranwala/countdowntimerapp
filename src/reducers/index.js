import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TimerReducer from './count_down_reducer';

const rootReducer = combineReducers({
  timers: TimerReducer,
  form: formReducer
});

export default rootReducer;
