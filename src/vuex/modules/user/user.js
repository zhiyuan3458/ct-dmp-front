/* 与user信息与token有关的vuex */
import { getToken, setTokenInCookie, removeToken, setGetTokenTime } from '@/utils/auth';
import {loginByUserName} from '@/api/login/login';
import { logout } from '@/api/mainFrame/header';

const ERR_OK = 200;

const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, data) =>
    {
      state.token = data;
    }
  },
  actions: {
    /* 设置token */
    setToken ({ commit }, token)
    {
      commit('SET_TOKEN', token);
    },
    /* 登录 */
    async login ({ commit }, loginInfo)
    {
      try
      {
        const {data} = await loginByUserName(loginInfo);
        const token = {
          accessToken: data.data.access_token,
          refreshToken: data.data.refresh_token
        };
        setTokenInCookie(token);
        /* 设置登录（获取token）时间 */
        setGetTokenTime();
        commit('SET_TOKEN', 'CTtoken ' + data.data.access_token);
        return token;
      }
      catch (err)
      {
        console.log('登录错误： ' + err);
      }
    },
    /* 登录 */
    async qrCodeLogin ({ commit }, data)
    {
      try
      {
        const token = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token
        };
        setTokenInCookie(token);
        /* 设置登录（获取token）时间 */
        setGetTokenTime();
        commit('SET_TOKEN', 'CTtoken ' + data.access_token);
        return token;
      }
      catch (err)
      {
        console.log('登录错误： ' + err);
      }
    },
    /* 登出 */
    async logout ({ commit })
    {
      try
      {
        const res = await logout(getToken());
        let code = res.data.code;
        if (code === ERR_OK)
        {
          removeToken();
          commit('SET_TOKEN', '');
        }
        else
        {
          throw new Error(res);
        }
        return await (res);
      }
      catch (err)
      {
        console.log('登出失败！');
      }
    }
  }
};

export default user;
