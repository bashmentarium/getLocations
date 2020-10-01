import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input'
import {addPlace} from '../ducks/places'

import styles from '../constants/styles'

const logo = require('../assets/images/png/logo.png')

const NewPlace = ({navigation}) => {
  const [titleValue, setTitleValue] = useState('')
  const [focused, setFocused] = useState(false)
  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue))
    navigation.navigate('Places')
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          onChangeText={titleChangeHandler}
          value={titleValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder='Enter a place title'
        />

        <TouchableOpacity
          onPress={savePlaceHandler}
          style={styles.defaultButton}
        >
          <Text style={styles.buttonText}>Save Place</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

NewPlace.navigationOptions = ({navigation}) => ({
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

export default NewPlace
