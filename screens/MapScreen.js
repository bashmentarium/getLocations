import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
const logo = require('../assets/images/png/logo.png')

import styles from '../constants/styles'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MapScreenScreen</Text>
    </View>
  )
}

MapScreen.navigationOptions = ({navigation}) => ({
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

export default MapScreen
