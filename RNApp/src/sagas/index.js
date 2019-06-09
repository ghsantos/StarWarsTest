import { all, select, call, put, takeEvery } from 'redux-saga/effects';

import { getPage, getPeoplesLength, getCount } from './selectors';
import { getPeoples } from '../api';

function* fetchPeoples() {
  const page = yield select(getPage);
  const count = yield select(getCount);
  const peoplesLength = yield select(getPeoplesLength);

  if (peoplesLength !== count) {
    const res = yield call(getPeoples, page);

    if (res.data.results) {
      const peoplesLength = yield select(getPeoplesLength);

      const peoples = res.data.results.map((people, index) => ({
        ...people,
        id: peoplesLength + index + 1,
      }));

      yield put({ type: 'PEOPLES_RECEIVED', peoples, count: res.data.count });
    }
  } else {
    yield put({ type: 'PEOPLES_DONE' });
  }
}

function* actionGetPeoples() {
  yield takeEvery('GET_PEOPLES', fetchPeoples);
}

export default function* rootSaga() {
  yield all([actionGetPeoples()]);
}
