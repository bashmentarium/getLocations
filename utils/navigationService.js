import {NavigationActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

/**
 * @method navigate
 * @description Navigates to the screen specified in the route parameter, as well as passes data along through params parameter.
 * @param {String} routeName
 * @param {any[]} params
 */
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

// Add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
}
