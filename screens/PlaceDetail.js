import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
const logo = require('../assets/images/png/logo.png')

import styles from '../constants/styles'

const PlaceDetail = () => {
  return (
    <View style={styles.container}>
      <Text>Place Detail Screen</Text>
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
