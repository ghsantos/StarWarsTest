import { all, select, call, put, takeEvery } from 'redux-saga/effects';

import { getPage, getPeoplesLength, getCount } from './selectors';
import { getPeoples, getPeople, getPlanet } from '../api';

function* fetchPeoples() {
  const page = yield select(getPage);
  const count = yield select(getCount);
  const peoplesLength = yield select(getPeoplesLength);

  if (peoplesLength !== count) {
    const res = yield call(getPeoples, page);

    if (res.data.results) {
      const peoples = res.data.results.map((people, index) => ({
        ...people,
        id: people.url.split(/\/(\d+)\//)[1],
      }));

      yield put({ type: 'PEOPLES_RECEIVED', peoples, count: res.data.count });
    }
  } else {
    yield put({ type: 'PEOPLES_DONE' });
  }
}

function* fetchPeople(action) {
  try {
    const { data: people } = yield call(getPeople, action.id);

    const homeworldID = people.homeworld.split(/\/(\d+)\//)[1];

    const { data: planet } = yield call(getPlanet, homeworldID);

    const homeworld = planet.name;

    yield put({ type: 'PEOPLE_RECEIVED', people: { ...people, homeworld } });
  } catch (err) {
    yield call(console.log, { err });
    const errorMessage = err.message;

    yield put({ type: 'ERROR', errorMessage });
  }
}

function* actionGetPeoples() {
  yield takeEvery('GET_PEOPLES', fetchPeoples);
}

function* actionGetPeople() {
  yield takeEvery('GET_PEOPLE', fetchPeople);
}

export default function* rootSaga() {
  yield all([actionGetPeoples(), actionGetPeople()]);
}
