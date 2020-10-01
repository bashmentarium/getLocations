import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

import styles from '../../constants/styles'

const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{uri: props.image}} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PlaceItem
