import axios from 'axios';

// axios를 구성하는 환경설정 코드가 들어감
// configuration
const instance = axios.create({
  baseURL: 'http://localhost:4001',
  // timeout: 1,
});

instance.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전 수행
    console.log('인터셉트 요청 성공!');
    return config;
  },
  function (error) {
    // 오류 요청을 보내기 전 수행
    console.log('인터셉트 요청 오류!');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log('인터넵트 응답 성공!');
    // 정상 응답
    return response;
  },

  function (error) {
    console.log('인터셉트 응답 오류!');
    return Promise.reject(error);
  }
);

export default instance;
