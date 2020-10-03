import {NavigationActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

/**
 * @method navigate
 * @description A function that navigates to the screen specified
 * in the route parameter, as well as pass data along through params parameter.
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
