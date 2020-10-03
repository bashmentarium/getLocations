import * as FileSystem from 'expo-file-system'
import Place from '../models/place'
import {insertPlace, fetchPlaces} from '../utils/db'

import {apiKey} from '../utils/apiKey'

// Constants
export const moduleName = 'addPlace'
const prefix = `${moduleName}`

const ADD_PLACE = `${prefix}/ADD_PLACE`
const LOAD_PLACES = `${prefix}LOAD_PLACES`

// AC
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}
    `)
    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const resData = await response.json()
    if (!resData) {
      throw new Error('Something went wrong')
    }

    const address = resData.results[0].formatted_address

    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      })
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      )
      console.log(dbResult)
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces()
      console.log(dbResult)
      dispatch({type: LOAD_PLACES, places: dbResult.rows._array})
    } catch (err) {
      throw err
    }
  }
}

// Reducers
const initialState = {
  places: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      }
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      )
      return {
        places: state.places.concat(newPlace),
      }
    default:
      return state
  }
}

// Selectors
