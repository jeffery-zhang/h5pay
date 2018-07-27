import axios from 'axios';

export default function () {
  const method = 'post';
  const postFunction = (url, params) => {
    const data = new URLSearchParams();
    Object.keys(params).forEach(key => {
      data.append(key, params[key]);
    });
    return axios({
      method,
      url,
      data,
    })
      .then(res => res.data);
  };
  return {
    payment(params) {
      return postFunction('/order/unifiedOrder', params);
    },
  };
};
