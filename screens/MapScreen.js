import React, {useState, useEffect, useCallback} from 'react'
import {Text, TouchableOpacity, Image} from 'react-native'
import MapView, {Marker} from 'react-native-maps'

import styles from '../constants/styles'

const MapScreen = ({navigation}) => {
  const initialLocation = navigation.getParam('initialLocation')
  const readonly = navigation.getParam('readonly')
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
    if (readonly) {
      return
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return
    }
    navigation.navigate('New', {
      pickedLocation: selectedLocation,
    })
  }, [selectedLocation])

  useEffect(() => {
    navigation.setParams({saveLocation: savePickedLocationHandler})
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.mapScreen}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked location' coordinate={markerCoordinates} />
      )}
    </MapView>
  )
}

MapScreen.navigationOptions = ({navigation}) => {
  const saveFn = navigation.getParam('saveLocation')
  const readonly = navigation.getParam('readonly')
  if (readonly) {
    return {
      headerTitleStyle: {
        fontFamily: 'regular',
        fontSize: 19,
      },
    }
  }

  return {
    headerTitleStyle: {
      fontFamily: 'regular',
      fontSize: 19,
    },
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
    headerBackTitle: null,
  }
}

export default MapScreen
