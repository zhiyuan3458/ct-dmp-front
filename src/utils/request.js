/**
 * 创建axios实例
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import router from '@/router';
import axios from 'axios';
import { Message } from 'element-ui';
import urlPrifix from '@/common/js/urlPrifix';
import store from '@/vuex';
import { getToken, getRefreshToken, setTokenInCookie, removeToken, getGetTokenTime, setGetTokenTime } from './auth';

const authority = urlPrifix.authority;
/* 无权访问code */
const ERR_OK = 200;
/* 定义一个全局刷新标志 */
window.isRefreshing = false;
/* 定义一个token过期之后发来的请求收集数组 */
let refreshAPI = [];
/* 不需要token的url */
const noTokenUrl = [
  `${urlPrifix.authority}/oauth/token`,
  `${urlPrifix.authority}/user/browserAccessToken`
];
/**
 * 判断access_token是否过期
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Boolean值
 */
function isTokenExpired ()
{
  const expiredTime = 60 * 25 * 1000;
  const getTokenTime = getGetTokenTime();
  return new Date().getTime() - expiredTime > getTokenTime;
}

/**
 * 把token过期后的请求截取并放到refreshAPI中缓存
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    cb——token过期后被截取的请求
 */
function subscribeTokenRefresh (cb)
{
  refreshAPI.push(cb);
}

/**
 * 重新执行token过期后发起的请求
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    token——access_token
 * @return   返回token过期后发起的请求
 */
function onRrefreshed (token)
{
  refreshAPI.map(cb => cb(token));
  refreshAPI = [];
}

/**
 * access_token过期后通过refresh_token获取新的access_token
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Promise对象
 */
function getTokenByRefreshToken ()
{
  return axios.post(`${authority}/oauth/token?grant_type=refresh_token&client_id=browser&client_secret=browser&refresh_token=${getRefreshToken()}`);
}

/* 创建axios 实例 */
const service = axios.create({
  timeout: 15000
});

/* 请求全局拦截 */
service.interceptors.request.use(config =>
{
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (store.getters.token)
  {
    config.headers['CTtoken'] = getToken();
  }
  if (!noTokenUrl.includes(config.url.split('?')[0]))
  {
    if (isTokenExpired())
    {
      let retry = new Promise((resolve, reject) =>
      {
        /* (token) => {...}这个函数就是cb */
        subscribeTokenRefresh((token) =>
        {
          config.headers['CTtoken'] = token;
          /* 将请求挂起 */
          resolve(config);
        });
      });
      if (!window.isRefreshing)
      {
        window.isRefreshing = true;
        getTokenByRefreshToken().then(res =>
        {
          let code = res.data.code;
          if (code === 407) // 无效的刷新令牌
          {
            Message({
              message: `刷新令牌已过期,请重新登陆`,
              type: 'error',
              duration: 3 * 1000
            });
            router.push('/login');
          }
          else
          {
            removeToken(); // 移除原来cookie中的失效token
            if (res.status === 200)
            {
              setGetTokenTime(); // 设置失效时间
              const token = {
                accessToken: res.data.data.access_token,
                refreshToken: res.data.data.refresh_token
              };
              setTokenInCookie(token); // 将token存入cookie
              store.dispatch('setToken', `CTtoken ${token.accessToken}`);
              onRrefreshed(`CTtoken ${token.accessToken}`);
            }
          }
        });
      }
      return retry;
    }
  }
  return config;
}, error =>
{
  Message({
    message: '请求失败！',
    type: 'error',
    duration: 3 * 1000
  });
  Promise.reject(error);
});

/* 响应全局拦截 */
service.interceptors.response.use(
  response =>
  {
    let code = response.data.code;
    window.isRefreshing = false;
    if (code !== null || code !== '')
    {
      if (code !== ERR_OK)
      {
        if (code === 0)
        {
          Message({
            message: `${response.data.msg}!\turl:${response.data.data}`,
            type: 'error',
            duration: 3 * 1000
          });
        }
        else if (code === 425)
        {
        }
        else
        {
          Message({
            message: response.data.msg + '!',
            type: 'error',
            duration: 3 * 1000
          });
          if (code === 406)
          {
            removeToken();
            setTimeout(() =>
            {
              router.push('/login');
            }, 1000);
          }
        }
      }
      else
      {
        return response;
      }
    }
  },
  error =>
  {
    console.log('err: ' + error);
    Message({
      message: '请求失败！',
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
