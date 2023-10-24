//REGISTER
export const POST_FAKE_REGISTER = 'user/insert';

//LOGIN
export const JWT_LOGIN = '/api/authenticate';
export const JWT_REFRESH_LOGIN = '/api/refreshToken';
export const SIGN_UP = '/api/sign-up';
export const POST_FAKE_JWT_LOGIN = '/post-jwt-login';
export const POST_FAKE_PASSWORD_FORGET = '/fake-forget-pwd';
export const POST_FAKE_JWT_PASSWORD_FORGET = '/jwt-forget-pwd';
export const SOCIAL_LOGIN = '/social-login';

// JOBS
export const GET_JOB_LIST = '/jobs';
export const ADD_NEW_JOB_LIST = '/add/job';
export const UPDATE_JOB_LIST = '/update/job';
export const DELETE_JOB_LIST = '/delete/job';

//Apply Jobs
export const GET_APPLY_JOB = '/jobApply';
export const DELETE_APPLY_JOB = 'add/applyjob';

//BOARD
export const GET_BOARD_LIST = '/board/list';
export const INSERT_BOARD_INFO = '/board/reg';
export const UPDATE_BOARD_LIST = '/board/update';
export const GET_BOARD_DETAIL = '/board/detail';
export const DELETE_BOARD_LIST = '/board/delete';

//CODE
export const GET_CODE_LIST = '/code/list';
export const GET_CODE_DETAIL = '/code/detail';
export const INSERT_CODE_INFO = '/code/insert';
export const UPDATE_CODE_INFO = '/code/update';
export const DELETE_CODE_LIST = '/code/delete';

export const POST_EDIT_JWT_PROFILE = '/post-jwt-profile';
export const POST_EDIT_PROFILE = '/post-jwt-profile';
//USER
export const GET_USERS = '/user/list';
export const INSERT_USER = '/user/insert';
export const DETAIL_USER = '/user/detail';
export const UPDATE_USER = '/user/update';
export const DELETE_USER = '/user/delete';
export const GET_USER_PROFILE = '/user';
export const ADD_NEW_USER = '/user/insert';

//MENU
export const GET_MENU_LIST = '/menu/list';
export const DETAIL_MENU = '/menu/detail';
export const INSERT_MENU = '/menu/insert';
export const UPDATE_MENU = '/menu/update';
export const DELETE_MENU = '/menu/delete';

// export const DELETE_USER = "/user/delete";
// export const GET_USER_PROFILE = "/user";
// export const ADD_NEW_USER = "/user/insert";

//AUTH
export const GET_AUTH_LIST = '/admin/auth/list';
export const GET_AUTH_DETAIL = '/admin/auth/detail';
export const INSERT_AUTH_INFO = '/admin/auth/insert';
export const UPDATE_AUTH_INFO = '/admin/auth/update';
export const DELETE_AUTH_LIST = '/admin/auth/delete';

export const SEND_AUTH_MAIL_CONFIRM = '/api/emails/auth-email-confirm';
export const CREATE_NEW_PASSWORD = '/api/emails/create-new-password';
