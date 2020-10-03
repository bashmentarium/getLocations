import React from 'react'
import {TouchableOpacity, Image, View} from 'react-native'
import {apiKey} from '../../utils/apiKey'

import styles from '../../constants/styles'

const MapPreview = (props) => {
  let imagePreviewUrl

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}, ${props.location.lng}&zoom=14&size=400x150&maptype=satellite
  &markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}
  &key=${apiKey}`
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.mapPreview}>
      {props.location ? (
        <Image
          source={{uri: imagePreviewUrl}}
          style={{width: 230, height: 150}}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
}

export default MapPreview
