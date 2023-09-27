# GroupWare Study Project

## 프로젝트 설명
1. 출결관리 시스템 개발을 목표로 함 
2. 백엔드는 Java 1.8, SpringBoot 2.7.8, 프론트엔드는 React 17를 사용 
3. 로그인 Spring Security 사용 + JWT 구현 
4. 라이브러리 셋팅을 위한 Gradle을 사용 
5. 프론트엔드는 React(https://ko.legacy.reactjs.org/) 사용 
6. DB는 MySQL 사용 
7. SQL 작성을 위한 MyBatis 사용 (MyBatis VS JPA ???)
8. 커넥션 풀(연동할 데이터베이스와의 연결을 미리 설정)은 Hikari CP 사용 
9. 로그관리 : logback 사용 
10. Rest API 형태로 백엔드 구성
11. SMTP 메일인증 구현 중

## ERD
https://www.erdcloud.com/d/HBWnJqYbRkjvvFojp

## 기능 설명
### 1. Hikari CP
https://velog.io/@miot2j/Spring-DB%EC%BB%A4%EB%84%A5%EC%85%98%ED%92%80%EA%B3%BC-Hikari-CP-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
> 해당 URL을 보면 히카리 풀커넥션의 장점을 알려준다. 설정방법도 나와있음, tomcat-jdbc와 성능적으로 월등히 차이남

### 2. Spring Boot jwt(로그인 인증 토큰발급 관련)
- https://velog.io/@jkijki12/Spirng-Security-Jwt-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
- https://llshl.tistory.com/m/32
- https://badstorage.tistory.com/33
- https://hyunsangwon93.tistory.com/24?category=746259
- 인프런 강좌 https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-jwt
- Refresh Token : https://hou27.tistory.com/entry/Refresh-Token

### 3. SMTP 메일인증
- https://green-bin.tistory.com/83
- https://velog.io/@kjh950330/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
- https://kimfk567.tistory.com/55
- 앱비밀번호 softleaf123!@#

### 4. React UI 관련 라이브러리
- 웹/모바일 감지한 반응형 사이트 : react-device-detect
- formik
  - form 관련 라이브러리 -> Form 상태를 다루기)
  - 특징 : 하나의 state store 관리, 유효성 검사 및 오류 메시지등을 쉽게 처리 가능
  - 참고 : https://formik.org/docs/overview
- yup : Form validation을 위한 라이브러리
  ```txt
  npm install @hookform/resolvers yup
  ```
- react-hook-form
  - 특징 : formik의 특징 + re-randing 방지 + 성능적으로 우월(가볍다)
  - 참고 : https://react-hook-form.com/kr/get-started

- 아이콘 관련 : iconify https://icon-sets.iconify.design/

## Backend
### 1. 실행 방법 
- main controller : GroupwareApplication.java 파일 실행

### 2. 프로젝트 구조

## Frontend
### 1. 실행 방법 
- React를 사용하기 위한, nodejs 서버와 yarn설치가 필요함
- Clone from GitHub
  ````
  git clone https://github.com/Young9235/groupware.git
  ````
- 설정 된 모듈 설치(package.json)
  ````
  yarn 
  ````
- nodejs로 react 프로젝트 실행
  ````    
  yarn start
  ````
- nodejs로 모듈 설치
  ````
  yarn add (모듈명)
  ````
> 특정 버전 설치시 package.json 파일을 직접 수정 하는 것보다 커맨드로 입력하는 것이 좋다. ex) yarn add lamina@^1.0.6
  
### 2. 프로젝트 구조
### 3. 템플릿 정보
### 4. ESLint 설정하기 
https://baeharam.netlify.app/posts/lint/Lint-ESLint-+-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
> 코드 일관성 및 팀플 시 규칙을 준수하기 위함, 올바른 ES6문법 체크, 문법체크 설정을 on,off 할 수 있다.
### 5. .prettierrc 파일 생성(코딩간편화)
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```