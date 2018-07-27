import $ from 'jquery'
import get from 'service/get'
import getQuery from 'service/getQuery'

import './common';

$(() => {
  if (!isMitu) return;

  const orderNo = getQuery('orderNo');
  let result = '';

  if (!orderNo) return;

  function showStatus(status) {
    let text = '';
    if (status === 1) {
      result = 'success';
      text = '支付成功';
    }
    if (status > 3) {
      result = 'fail';
      text = '支付失败';
    }
    $('.result').text(text);
    $('.result-container').addClass(result).show();
  }

  function getOrderInfo() {
    const params = {
      orderNo,
    };
    get().getOrderInfo(params).then(res => {
      $('.loading-container').hide();
      const data = res.data;
      const price = (data.totalFee / 100).toFixed(2);
      showStatus(data.status);
      $('.amount').text(price);
    });
  }

  function backApp() {
    let url = '';
    if (result === 'success') {
      url = 'MT://prepay/success';
    } else {
      url = 'MT://prepay/failed';
    }
    if (isiOS) {
      window.webkit.messageHandlers.callFunc.postMessage(url);
    }
    if (isAndroid) {
      android.callFunc(url);
    }
  }

  setTimeout(getOrderInfo, 2000);

  $('.back').click(backApp);
});