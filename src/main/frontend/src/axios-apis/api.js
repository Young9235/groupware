import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../common/cookie';
import { JWT_REFRESH_LOGIN } from './url';
// import accessToken from 'axios-apis/jwt-token-access/accessToken';
//
// //pass new generated access token here
// const token = accessToken;

//apply base url for axios
const API_URL = '';

const axiosApi = axios.create({
  headers: {},
  baseURL: API_URL,
});

// console.log(accessToken);
//
// axiosApi.defaults.headers.common['Authorization'] = accessToken;
// axiosApi.defaults.headers.common['Auth-Refresh-Token'] = refreshToken;

axiosApi.interceptors.request.use((config) => {
  const access_token = getCookie('access_token');
  const refresh_token = getCookie('refresh_token');
  config.headers['Authorization'] = `Bearer ${access_token}`;
  config.headers['Auth-Refresh-Token'] = `${refresh_token}`;
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const config = error.config;
    if (error.response.status === 308) {
      // 만료된 토큰 갱신
      axios({
        method: `post`,
        url: JWT_REFRESH_LOGIN,
        headers: config.headers,
      })
        .then((response) => {
          removeCookie('access_token');
          // 헤더 다시 셋팅하여, 발급된 엑세스 토큰으로 다시 조회
          const access_token = `${response.data.access_token}`;
          // console.log('access_token: ', access_token);
          config.headers['Authorization'] = access_token;
          setCookie('access_token', access_token);
          console.log('Token 정보가 업데이트 되었습니다.');
        })
        .catch((e) => {
          console.log('refresh token 발급 실패 =====> ', e.message);
          removeCookie('access_token');
          removeCookie('refresh_token');
        });
      // 통신 시, 에러가 뜨면 계속 통신을 하여 에러코드 리턴을 통신되는 시간 동안 무한루프 하기 때문에 서버 통신 시간 동안,
      // 일정시간을 딜레이 주어 통신되는 동안의 리턴을 막는다.
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axiosApi.request(config));
        }, 1000);
      });
    } else {
      // 에러 처리
      switch (error.response.status) {
        case 401:
          // window.location.href = '/401';
          break;
        case 403:
          // window.location.href = '/401';
          break;
        case 404:
          window.location.href = '/404';
          break;
        case 500:
          break;
        default:
          break;
      }
      console.log('error response => ', error.response);
      // console.log('error status => ', error.response.status);
      // console.log('error response => ', error.response);
      removeCookie('access_token');
      removeCookie('refresh_token');
      return Promise.reject(error);
    }
  }
);

export async function getToken(url, data, config = {}) {
  return axios.post(url, { ...data }, { ...config }).then((response) => {
    // console.log(response.data);
    const getAuth = JSON.parse(JSON.stringify(response.data));
    const access_token = getAuth.access_token;
    const refresh_token = getAuth.refresh_token;
    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    axiosApi.defaults.headers.common['Auth-Refresh-Token'] = `${refresh_token}`;
    // removeCookie('refresh_token');
    if (refresh_token && access_token) {
      setCookie('refresh_token', refresh_token);
      setCookie('access_token', access_token);
    } else {
      console.log('refresh_token underfined');
      return false;
    }
  });
}

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => {
    return response.data;
  });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
