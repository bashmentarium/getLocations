import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
const logo = require('../assets/images/png/logo.png')

import styles from '../constants/styles'

const MapScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState()

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
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
