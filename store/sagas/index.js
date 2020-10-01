import {fork, all} from 'redux-saga/effects'
import {saga as placesSaga} from '../../ducks/places'

export default function* root() {
  const sagas = [...placesSaga]
  yield all([...sagas].map((saga) => fork(saga)))
}
