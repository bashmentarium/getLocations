import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
const logo = require('../assets/images/png/logo.png')
import {useSelector} from 'react-redux'
import MapPreview from '../components/MapPreview'

import styles from '../constants/styles'

const PlaceDetail = ({navigation}) => {
  const placeId = navigation.getParam('placeId')
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  )

  const selectedLocation = {lat: selectedPlace.lat, lng: selectedPlace.lng}

  const showMapHandler = () => {
    navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation,
    })
  }

  return (
    <View style={styles.placeDetail}>
      <Image
        source={{uri: selectedPlace.toString()}}
        style={styles.placeImage}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreviewDetail}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </View>
  )
}

PlaceDetail.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('placeTitle'),
  headerTitleStyle: {
    fontFamily: 'regular',
    fontSize: 19,
  },
  headerRight: () => (
    <TouchableOpacity style={{width: 50}}>
      <Image source={logo} />
    </TouchableOpacity>
  ),
  headerBackTitle: null,
})

export default PlaceDetail
