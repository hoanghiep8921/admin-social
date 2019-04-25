
import configureUser from './users-reducer'
import {combineReducers} from "redux";

const allReducers = combineReducers({
  user:configureUser,
})

export default allReducers;