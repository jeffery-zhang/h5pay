import $ from 'jquery'
import get from 'service/get'
import post from 'service/post'
import getQuery from 'service/getQuery'

import './common';

$(() => {
  if (!isMitu) return;

  const orderNo = getQuery('orderNo');
  let tradeMethod = 'WXPAY';

  if (!orderNo) return;

  function getOrderInfo() {
    const params = {
      orderNo,
    };
    get().getOrderInfo(params).then(res => {
      if (!res.result) return;
      const data = res.data;
      if (data.status !== 2) return;
      const price = (data.totalFee / 100).toFixed(2);
      $('.sum').text(`￥${price}`);
      $('.order-content').text(data.content);
      $('.order-no').text(orderNo);
      $('.pay-button').text(`确认支付￥${price}`)
      $('.pay-wrapper').show();
    });
  }

  function changePayMethod(method) {
    const ele = event.target;
    $(ele).addClass('selected').siblings().removeClass('selected');
  }

  function wechatPay(url) {
    if (isAndroid) {
      location.href = url
        + `&redirect_url=${encodeURI('http://h5pay.mmcoco.com/result?orderNo=' + orderNo)}`;
    } else if (isiOS) {
      location.href = url
        + `&redirect_url=${encodeURI('h5pay.mmcoco.com://')}`;
    }
  }

  function alipay(str) {
    $('body').append(str);
  }

  function pay() {
    const params = {
      orderNo,
      tradeMethod,
      tradeType: 'WAP',
    };
    post().payment(params).then(res => {
      if (tradeMethod === 'WXPAY') {
        wechatPay(res.data.mwebUrl);
      }
      if (tradeMethod === 'ALIPAY') {
        alipay(res.data.mwebUrl);
      }
    });
  }

  getOrderInfo();

  $('.payment').click(function() {
    tradeMethod = $(this).data('method');
    changePayMethod(tradeMethod);
  });

  $('.pay-button').click(pay);
});