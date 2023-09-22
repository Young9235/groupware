import {
  REGISTER_USER,
  REGISTER_FAIL,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = (user, history)  => {
  return {
    type: REGISTER_USER,
    payload: { user ,history },
  }
}

export const registerFail = registrationError => {
  console.log("여기도 실패 타지?");
  return {
    type: REGISTER_FAIL,
    payload: registrationError,
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}
