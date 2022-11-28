import axios from 'axios';

const serverURL = 'http://172.30.1.55:8080/api/v1/';

const myAxios = async (
  action,
  path,
  body = null,
  withCredentials = false,
  token = undefined,
  contentType = 'application/json',
) => {
  const option = {
    headers: { 'Content-Type': contentType },
    withCredentials,
  };
  if (token) option.headers['Authorization'] = `Bearer ${token}`;

  switch (action) {
    case 'get':
      return await axios.get(`${serverURL}${path}`, option);
    case 'post':
      return await axios.post(`${serverURL}${path}`, body, option);
    case 'put':
      return await axios.put(`${serverURL}${path}`, body, option);
    case 'delete':
      return await axios.delete(`${serverURL}${path}`, option);
    default:
      return;
  }
};

export default myAxios;
