import axios from 'axios';

export default function () {
  const method = 'get';
  const getFunction = (url, params) => {
    return axios({
      method,
      url,
      params,
    })
      .then(res => res.data);
  };
  return {
    getOrderInfo(params) {
      return getFunction('/order/queryOrderInfo', params);
    },
  };
};
