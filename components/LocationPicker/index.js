import React, {useState} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapPreview from '../MapPreview'

import styles from '../../constants/styles'

const LocationPicker = ({navigation}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState()
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        'You need to location access to get the location.',
        [{text: 'Ok'}]
      )
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) {
      return
    }

    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({timeout: 5000})
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (e) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map.'
      )
    }
    setIsFetching(false)
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator size='large' color='#ccc' />
        ) : (
          <Text style={styles.address}>Location not chosen yet</Text>
        )}
      </MapPreview>
      <View>
        <TouchableOpacity
          onPress={getLocationHandler}
          style={styles.defaultButton}
        >
          <Text style={styles.buttonTextLight}>Get user location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickOnMapHandler}
          style={styles.defaultButton}
        >
          <Text style={styles.buttonTextLight}>Pick on map</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LocationPicker
