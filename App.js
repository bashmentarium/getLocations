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

import TabBarIcon from './components/TabBarIcon'
import NavigationService from './utils/navigationService'
import store from './store'

import colors from './constants/colors'

const details = require(`./assets/images/png/details.png`)
const map = require(`./assets/images/png/map.png`)
const places = require(`./assets/images/png/places.png`)
const plus = require(`./assets/images/png/plus.png`)
const details_focused = require(`./assets/images/png/details_focused.png`)
const map_focused = require(`./assets/images/png/map_focused.png`)
const places_focused = require(`./assets/images/png/places_focused.png`)
const plus_focused = require(`./assets/images/png/plus_focused.png`)

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
  main: createBottomTabNavigator(
    {
      Places: createStackNavigator(
        {
          Places: PlacesList,
        },
        {
          initialRouteName: 'Places',
          defaultNavigationOptions: {
            headerTitle: 'Places',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomColor: colors.background,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                name='map'
                image={focused ? places_focused : places}
              />
            ),
          },
        }
      ),
      ['Place detail']: createStackNavigator(
        {
          Detail: PlaceDetail,
        },
        {
          initialRouteName: 'Detail',
          defaultNavigationOptions: {
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomColor: 'transparent',
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                name='map'
                image={focused ? details_focused : details}
              />
            ),
          },
        }
      ),
      ['New place']: createStackNavigator(
        {
          New: NewPlace,
        },
        {
          initialRouteName: 'New',
          defaultNavigationOptions: {
            headerTitle: 'New place',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomColor: 'transparent',
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon name='map' image={focused ? plus_focused : plus} />
            ),
          },
        }
      ),
      Map: createStackNavigator(
        {
          Map: MapScreen,
        },
        {
          initialRouteName: 'Map',
          defaultNavigationOptions: {
            headerTitle: 'Map',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomColor: colors.background,
            },
          },
          navigationOptions: {
            tabBarIcon: ({focused}) => (
              <TabBarIcon name='map' image={focused ? map_focused : map} />
            ),
          },
        }
      ),
    },
    {
      initialRouteName: 'Places',
      tabBarOptions: {
        style: {
          backgroundColor: colors.background,
          height: 60,
          borderTopColor: 'transparent',
        },
        labelStyle: {
          fontFamily: 'light',
          fontSize: 13,
        },
        activeTintColor: colors.black,
        inactiveTintColor: colors.borderColor,
        keyboardHidesTabBar: true,
      },
    }
  ),
})

const App = createAppContainer(switchNavigator)

const fetchFonts = () => {
  return Font.loadAsync({
    light: require('./assets/fonts/Assistant-Light.ttf'),
    regular: require('./assets/fonts/Assistant-Regular.ttf'),
    medium: require('./assets/fonts/Assistant-SemiBold.ttf'),
    bold: require('./assets/fonts/Assistant-Bold.ttf'),
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
