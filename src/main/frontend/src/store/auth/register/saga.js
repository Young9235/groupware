import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import { registerUserSuccessful, registerUserFailed, registerFail } from './actions';

//Include Both Helper File with needed methods

import {
  postFakeRegister,
  // postJwtRegister,
} from 'src/axios-apis/backend';

// initialize relavant method of both Auth
// const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, history } }) {
  try {
    const response = yield call(postFakeRegister, user);
    if (response > 0) {
      yield put(registerUserSuccessful(response));
      alert('등록을 완료하였습니다.');
      history('/login');
    } else {
      console.log('들어오고1 ');
      const registrationError = '존재하는 아이디 입니다 확인바랍니다.';
      yield put(registerFail(registrationError));
    }
    console.log('response>>>>>', response);
    // history('/login');
  } catch (error) {
    console.log('There was an error registering: ', error);
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
