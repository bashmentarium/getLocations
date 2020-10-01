import React, {Component} from 'react'
import {TextInput} from 'react-native'

import styles from '../../constants/styles.js'

class Input extends Component {
  render() {
    return (
      <TextInput
        style={this.props.error ? styles.error : styles.input}
        autoCapitalize='none'
        clearTextOnFocus={this.props.clearTextOnFocus}
        autoCorrect={false}
        secureTextEntry={this.props.secureTextEntry}
        keyboardType={this.props.keyboardType}
        maxLength={this.props.maxLength}
        placeholder={this.props.placeholder}
        underlineColorAndroid='transparent'
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        onBlur={this.props.onBlur}
        returnKeyType={this.props.returnKeyType}
        onFocus={this.props.onFocus}
      />
    )
  }
}

export default Input
