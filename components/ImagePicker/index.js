import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import * as ImgPicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import {camera} from '../../assets/images/png'

import styles from '../../constants/styles'

const ImagePicker = ({onImageTaken}) => {
  const [pickedImage, setPickedImage] = useState()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    )
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        'You need to grant camera access to take a picture.',
        [{text: 'Ok'}]
      )
      return false
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const image = await ImgPicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })

    setPickedImage(image.uri)
    onImageTaken(image.uri)
  }

  return (
    <View style={styles.imagePicker}>
      {!pickedImage ? (
        <Text style={styles.address}>No image picked yet</Text>
      ) : (
        <Image source={{uri: pickedImage}} style={styles.imagePreview} />
      )}
      <TouchableOpacity style={styles.cameraButton} onPress={takeImageHandler}>
        <Image source={camera} style={styles.cameraButtonImage} />
        {/* <Text style={{...styles.buttonText, fontFamily: 'light'}}>
          Take image
        </Text> */}
      </TouchableOpacity>
    </View>
  )
}

export default ImagePicker
