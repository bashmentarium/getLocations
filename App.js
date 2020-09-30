import * as React from 'react'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import i18n from 'i18n-js'
import {Provider} from 'react-redux'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import getLocaleMessages from './localization/getLocaleMessages'

import Auth from './screens/Auth'
import SignUp from './screens/SignUp'

import PlacesList from './screens/PlacesList'
import PlaceDetail from './screens/PlaceDetail'
import NewPlace from './screens/NewPlace'
import MapScreen from './screens/MapScreen'

import NavigationService from './utils/navigationService'
import store from './store'

i18n.translations = {
  en: getLocaleMessages('en'),
}
i18n.locale = 'en'

export const switchNavigator = createSwitchNavigator({
  //Startup Screen
  login: createStackNavigator(
    {
      Auth: Auth,
      SignUp: SignUp,
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      },
    }
  ),
  main: createBottomTabNavigator({
    Places: PlacesList,
    PlaceDetail: PlaceDetail,
    NewPlace: NewPlace,
    Map: MapScreen,
  }),
})

const App = createAppContainer(switchNavigator)

const fetchFonts = () => {
  return Font.loadAsync({
    light: require('./assets/fonts/BarlowSemiCondensed-Light.ttf'),
    regular: require('./assets/fonts/BarlowSemiCondensed-Regular.ttf'),
    medium: require('./assets/fonts/BarlowSemiCondensed-Medium.ttf'),
    bold: require('./assets/fonts/BarlowSemiCondensed-Bold.ttf'),
  })
}

export default () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  }
  return (
    <Provider store={store}>
      <App
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    </Provider>
  )
}
