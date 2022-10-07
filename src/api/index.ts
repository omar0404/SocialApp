import { Config } from 'react-native-config';
import axios from 'axios';
import { SensitiveInfo } from '../service';

const { API_URL } = Config;
let Axios = axios.create({ baseURL: API_URL });
Axios.interceptors.request.use(async config => {
  const token = await SensitiveInfo.getItem('token');
  if (config?.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default Axios;
