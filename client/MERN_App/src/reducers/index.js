import { combineReducers } from 'redux';

import postsReducer from './posts';
import loginReducer from './Login';

const reducers = combineReducers({ posts:postsReducer, login: loginReducer });

export default reducers;