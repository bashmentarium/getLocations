import React from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {useSelector} from 'react-redux'
const logo = require('../assets/images/png/logo.png')

import PlaceItem from '../components/PlaceItem'

import styles from '../constants/styles'
import colors from '../constants/colors'

const PlacesList = ({navigation}) => {
  const places = useSelector((state) => state.places.places)

  return (
    <View style={styles.container}>
      <ScrollView>
        {places.map(({title, id, imageUri, address}) => {
          return (
            <PlaceItem
              key={id}
              title={title}
              image={imageUri}
              address={address}
              onSelect={() => {
                navigation.navigate('Detail', {
                  placeTitle: title,
                  placeId: id,
                })
              }}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

PlacesList.navigationOptions = ({navigation}) => ({
  headerTitleStyle: {
    fontFamily: 'regular',
    fontSize: 19,
  },
  headerStyle: {
    backgroundColor: colors.background,
    borderBottomColor: 'transparent',
  },
  headerRight: () => (
    <TouchableOpacity style={{width: 50}}>
      <Image source={logo} />
    </TouchableOpacity>
  ),
  headerBackTitle: null,
})

export default PlacesList
