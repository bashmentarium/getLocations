import {combineReducers} from 'redux'
import login, {moduleName as loginReducer} from '../ducks/login'
import addPlace from '../ducks/places'

export default combineReducers({
  // [loginReducer]: login,
  places: addPlace,
})
