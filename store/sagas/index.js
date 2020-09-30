import {fork, all} from 'redux-saga/effects'
// import { saga as loginSaga } from "../../ducks/login";

export default function* root() {
  const sagas = []
  yield all([...sagas].map((saga) => fork(saga)))
}
