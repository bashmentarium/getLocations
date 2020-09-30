import React from 'react'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'

import styles from '../../constants/styles'

const Auth = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Places')
  }

  return (
    <View>
      <Text>Auth Screen</Text>
      <Button
        style={styles.defaultButton}
        title='Show Places List'
        onPress={onPress}
        size={15}
      />
    </View>
  )
}

export default Auth
