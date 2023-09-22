import { all, fork } from 'redux-saga/effects';

//public
import AccountSaga from 'src/store/auth/register/saga';
// import AuthSaga from "./auth/login/saga";
import ForgetSaga from 'src/store/auth/forgetpwd/saga';
import ProfileSaga from 'src/store/auth/profile/saga';
import LayoutSaga from 'src/store/layout/saga';
import jobsSaga from 'src/store/jobs/saga';
import contactsSaga from 'src/store/contacts/saga';

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    // fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(jobsSaga),
    fork(contactsSaga),
  ]);
}
