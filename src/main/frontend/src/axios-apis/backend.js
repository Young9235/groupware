import axios from 'axios';
import * as url from 'src/axios-apis/url';
import { del, get, post, put } from 'src/axios-apis/api';
import { SIGN_UP } from 'src/axios-apis/url';

// Gets the logged in user data from local session

// Register Method
const postFakeRegister = (data) => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = 'Sorry! the page you are looking for could not be found';
            break;
          case 500:
            message = 'Sorry! something went wrong, please contact our support team';
            break;
          case 401:
            message = 'Invalid credentials';
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// postForgetPwd
const postFakeForgetPwd = (data) => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = (data) => {
  console.log('data', data);
  sessionStorage.setItem('authUser', JSON.stringify(data));
  return post(url.POST_EDIT_PROFILE, data);
};
// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = 'Sorry! the page you are looking for could not be found';
            break;
          case 500:
            message = 'Sorry! something went wrong, please contact our support team';
            break;
          case 401:
            message = 'Invalid credentials';
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postJwtLogin = (data) => post(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = (data) => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => post(url.SOCIAL_LOGIN, data);

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get board
export const getBoardList = (params) => get(url.GET_BOARD_LIST, params);
export const getBoardInfo = (reqParam) => get(`${url.GET_BOARD_DETAIL}/${reqParam}`);
export const insertBoard = (params) => post(url.INSERT_BOARD_INFO, params);
export const updateBoard = (reqParam, params) =>
  put(`${url.UPDATE_BOARD_LIST}/${reqParam}`, params);
export const deleteBoardList = (params) => del(url.DELETE_BOARD_LIST, params);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// add jobs
export const addNewJobList = (job) => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = (job) => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = (job) => del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = (data) => del(url.DELETE_APPLY_JOB, { headers: { data } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

/***************** 우리꺼 BACKEND START *****************/

// User
export const getUsers = (params) => get(url.GET_USERS, params);
export const addNewUser = (user) => post(url.ADD_NEW_USER, user);
export const getUserInfo = (param) => get(`${url.DETAIL_USER}/${param}`);
export const updateUser = (id, params) => put(`${url.UPDATE_USER}/${id}`, params);
export const deleteUser = (params) => del(url.DELETE_USER, params);
export const signUp = (params) => post(url.SIGN_UP, params);

// Menu
export const getMenuList = (params) => get(url.GET_MENU_LIST, params);
export const getMenuInfo = (param) => get(`${url.DETAIL_MENU}/${param}`);
export const insertMenu = (menu) => post(url.INSERT_MENU, menu);
export const updateMenu = (id, params) => put(`${url.UPDATE_MENU}/${id}`, params);
export const deleteMenu = (params) => del(url.DELETE_MENU, params);

// CODE
export const getCodeList = (params) => get(url.GET_CODE_LIST, params);
export const getCodeInfo = (reqParam) => get(`${url.GET_CODE_DETAIL}/${reqParam}`);
export const insertCode = (params) => post(url.INSERT_CODE_INFO, params);
export const updateCode = (reqParam, params) => put(`${url.UPDATE_CODE_INFO}/${reqParam}`, params);
export const deleteCodeList = (params) => del(url.DELETE_CODE_LIST, params);

// AUTH
export const getAuthList = (params) => get(url.GET_AUTH_LIST, params);
export const getAuthInfo = (reqParam) => get(`${url.GET_AUTH_DETAIL}/${reqParam}`);
export const insertAuth = (params) => post(url.INSERT_AUTH_INFO, params);
export const updateAuth = (reqParam, params) => put(`${url.UPDATE_AUTH_INFO}/${reqParam}`, params);
export const deleteAuthList = (params) => del(url.DELETE_AUTH_LIST, params);

export {
  postFakeRegister,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
};
