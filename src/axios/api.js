import axios from 'axios';

// axios를 구성하는 환경설정 코드가 들어감
// configuration
const instance = axios.create({
  baseURL: 'http://localhost:4001',
});

export default instance;
