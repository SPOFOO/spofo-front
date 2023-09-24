import axios from 'axios';
//import { useRouter } from 'vue-router';

/*
    vue3의 ts파일에서 vue router를 사용하기
    1. 파일명에 카멜표기법을 사용하지 않고 ts 파일로 인식하게 한다.
    2. 위와 같이 router를 import하여 활용한다.
*/

const instance = axios.create();
//const router = useRouter();

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    const idToken = localStorage.getItem('authorization') || '';

    if (idToken != null && config.headers != null) {
      config.headers['authorization'] = 'Bearer ' + idToken;
      config.headers['socialType'] = localStorage.getItem('socialType') || '';
    }

    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

/*
// 응답(response) interceptor
instance.interceptors.response.use(
  function (response) {
    // 200대 response를 받아 응답 데이터를 가공하는 작업
    return response;
  },
  function (error) {
    // 200대 이외의 오류 응답을 가공
    if (error.response.data.errorCode === '401') {
      if (
        error.response.data.exceptionName === 'AccessTokenNotFound' ||
        error.response.data.exceptionName === 'SignatureException'
      ) {
        // 토큰이 존재하지 않거나 서명 예외 발생 시 로그인 페이지로 이동
        router.push({ name: '/login' });
      }
      if (error.response.data.exceptionName === 'ExpiredJwtException') {
        // 토큰이 만료되었을 때 refresh 토큰 발급 요청
      }
    }
    return Promise.reject(error);
  }
);
*/
export default instance;
