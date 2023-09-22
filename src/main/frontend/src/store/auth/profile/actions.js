import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG ,PROFILE_FAIL} from "./actionTypes"

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = msg => {
  // const msg = "수정에 완료하였습니다.";
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileFail = msg => {
  // const msg = "수정에 완료하였습니다.";
  return {
    type: PROFILE_FAIL,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
