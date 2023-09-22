import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, {
    // httpOnly: true, // .com이라는 도메인에 배포하였을때 해당 옵션을 활성화 시킨다.
    // withCredentials: true,
    secure: true, // https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송하는 옵션 -> 현재 쿠키를 서버로 전송(req)하는 부분은 없다, 프론트쪽에서만 처리된다.
    path: '/',
    sameSite: 'strict', //요청을 보내게 될 때 그 베이스가 되는 문서의 url (즉, 페이지에 접속했을 때 상단에 보이는 URL) 의 호스트와 지금 보내려고 하는 쿠키의 주소가 동일하지 않다면 전송을 막는 옵션을 설정해줄 수 있다.
    ...option,
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
