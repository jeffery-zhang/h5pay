import './../css/common.css';
import './../css/global.scss';

const u = navigator.userAgent;
window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
window.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
window.isMitu = u.toLowerCase().includes('mitu');
