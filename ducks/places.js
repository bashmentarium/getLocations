import {createAction} from '@reduxjs/toolkit'
import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects'
import Place from '../models/place'

// Constants
export const moduleName = 'addPlace'
const prefix = `${moduleName}`

const ADD_PLACE = `${prefix}/ADD_PLACE`

// AC
export const addPlace = (title) => {
  return {type: ADD_PLACE, placeData: {title: title}}
}

// Reducers
const initialState = {
  places: [],
}

export default (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title)
      return {
        places: state.places.concat(newPlace),
      }
    default:
      return state
  }
}

// Selectors

// Sagas

export function* addPlaceSaga({type, payload}) {
  try {
    yield put(addPlace)
  } catch (error) {
    return null
  }
}

export const saga = [
  function* saga() {
    yield all([takeLatest(ADD_PLACE, addPlaceSaga)])
  },
]
