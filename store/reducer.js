import {combineReducers} from 'redux'
import login, {moduleName as loginReducer} from '../ducks/login'

export default combineReducers({
  [loginReducer]: login,
})
