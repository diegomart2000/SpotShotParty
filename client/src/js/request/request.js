import axios from 'axios';
import Cookie from 'js-cookie';
axios.defaults.withCredentials = true;

const serviceAPI = process.env.BACKEND_URL || '//localhost:8080'; // This wil be replaced by DefinePlugin

const errorsInterceptor = (err) => {
  const { response, config } = err;
  if (!response) {
    err.response = { data: { error: 'There was an error. Please check your internet connection and try again.' } };
  } else if (response.status === 401) {
    console.error('User not authenticated');
    err.response.data = response.data;
  } else if (response.status === 500
    && response.headers['content-type'].match(/text\/html/)) {
    err.response.data = { error: response.statusText };
  }
  throw err;
};

export default () => {
  const instance = axios.create({
    baseURL: `${serviceAPI}/api`,
  });

  instance.interceptors.response.use(
    response => response,
    errorsInterceptor,
  );

  return instance;
};
