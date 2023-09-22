import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { EDIT_PROFILE } from './actionTypes';
import { profileSuccess, profileError, profileFail } from './actions';

//Include Both Helper File with needed methods
import { postFakeProfile } from 'src/axios-apis/backend';

// const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload: { user } }) {
  try {
    console.log('여기로 들어오겠지?');
    const response = yield call(postFakeProfile, {
      username: user.username,
      password: user.password,
      idx: user.idx,
    });
    console.log('response', response);
    if (response === 1) {
      console.log('여기 들어옴??');
      const response = '수정완료했습니다.';
      yield put(profileSuccess(response));
    } else {
      console.log('여기 들어옴??');
      const response = '수정에 실패하였습니다.';
      yield put(profileFail(response));
    }
  } catch (error) {
    yield put(profileError(error));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
