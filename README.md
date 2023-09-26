# GroupWare Study Project

## 프로젝트 설명
1. 출결관리 시스템 개발을 목표로 함 
2. 백엔드는 Java 1.8, SpringBoot 2.7.8, 프론트엔드는 React 17를 사용 
3. 로그인 Spring Security 사용 + JWT 구현 
4. 라이브러리 셋팅을 위한 Gradle을 사용 
5. 프론트엔드는 React Hook을 사용 
6. DB는 MySQL 사용 
7. SQL 작성을 위한 MyBatis 사용 (MyBatis VS JPA ???)
8. 커넥션 풀(연동할 데이터베이스와의 연결을 미리 설정)은 Hikari CP 사용 
9. 로그관리 : logback 사용 
10. Rest API 형태로 백엔드 구성

## 기능 설명
1. 

### Hikari CP
https://velog.io/@miot2j/Spring-DB%EC%BB%A4%EB%84%A5%EC%85%98%ED%92%80%EA%B3%BC-Hikari-CP-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
- 해당 URL을 보면 히카리 풀커넥션의 장점을 알려준다. 설정방법도 나와있음, tomcat-jdbc와 성능적으로 월등히 차이남

### refresh token
https://hou27.tistory.com/entry/Refresh-Token

## 프로젝트 구조

## 백엔드 분석
- 실행 방법 
````
main controller : GroupwareApplication.java 파일 실행
````

## 프론트엔드 분석
- 실행 방법 
  - yarn 명령어를 사용하기 위한, nodejs와 yarn설치가 필요함
- 터미널 명령어
  - 설정 된 모듈 설치(package.json
  ````
    D:\groupware\src\main\frontend > yarn
  ````
  - nodejs로 react 프로젝트 실행 
  ````
    D:\groupware\src\main\frontend > yarn start
  ````

## 템플릿 정보

