import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer.js'
import mySaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(mySaga)

// DEV ONLY
window.store = store

export default store
