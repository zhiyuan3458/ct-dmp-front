/**
 * login.vue的api
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import { postHttp } from '../util';
import prifix from '@/common/js/urlPrifix';

export const loginByUserName = (userInfo) => postHttp(`${prifix.authority}/oauth/token`, {
  grant_type: 'password',
  username: userInfo.userName,
  password: userInfo.passWord,
  client_id: 'browser',
  client_secret: 'browser'
});

/**
 * 轮询看一下是否已经用app扫码获取到了accesstoken
 * @param browserId——随机乱码字符串
 */
export const browserAccessToken = (params) => postHttp(`${prifix.authority}/user/browserAccessToken`, params);
