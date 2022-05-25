import httpRequest from 'services/httpRequest';

export const loginUser = async (url, bodyData = {}) => {
  return httpRequest.post(url, bodyData, {
    showLoading: true,
  });
};

export const postResult = async (url, bodyData = {}) => {
  return httpRequest.post(url, bodyData, {
    showLoading: true,
  });
};
