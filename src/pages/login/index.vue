<template>
<div class="login-wrapper" @keyup.enter="handleLogin">
  <div class="title-wrapper">
    <img class="logo" :src="systemLogo">
    <span class="system-manage">{{stationName}}</span>
  </div>
  <div class="main-wrapper">
    <div class="login-wrapper">
      <div class="login-box">
        <div class="title">
          <ul>
            <li v-if="userLoginTitleShow" :class="{active:0 === nowIndex}" @click="handleClick(0)">用户登录</li>
            <li v-if="mobileLoginTitleShow" :class="{active:1 === nowIndex}" @click="handleClick(1)">动态密码登录</li>
            <li v-if="qrCodeLoginTitleShow" class="active">扫码登录</li>
          </ul>
        </div>
        <el-form ref="form" :model="loginForm" label-width="65px" v-show="userLoginShow">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.passWord"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked">记住用户名与密码</el-checkbox>
          <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
        </el-form>
        <!-- 手机验证码 -->
        <el-form ref="form" :model="loginForm" label-width="65px" v-show="mobileLoginShow">
          <el-form-item label="手机号">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input placeholder="请输入验证码" v-model="checkCode">
              <template slot="append"><span style="cursor: pointer;">获取验证码</span></template>
            </el-input>
          </el-form-item>
          <el-checkbox style="opacity: 0;" v-model="checked">记住用户名与密码</el-checkbox>
          <el-button class="login-btn" type="primary">登录</el-button>
        </el-form>
        <!-- 二维码 -->
        <div v-show="qrCodeLoginShow" class="qr-code-login">
          <div id="loginCode"></div>
        </div>
        <div v-if="userLoginTitleShow" class="type_switch" @click="type_switch(0)"></div>
        <div v-if="qrCodeLoginTitleShow" class="type_switch_pc" @click="type_switch(1)"></div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="copy-right">
      版权所有@Copyright <a href="http://www.gdctjt.com/" target="_blank">广东诚泰交通科技发展有限公司</a>
      <div class="recommand">
        <span>
          注：推荐使用谷歌(Chrome)浏览器
          <a :href="chromeUrl" target="_blank" class="download"><em>去下载</em></a>
        </span>
      </div>
    </div>
    <div class="erwei-code-wrapper">
      <img class="img" src="./img/erweiCode-ios.png" alt="">
      <img class="img" src="./img/erweiCode-android.png" alt="">
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getSubSystemInfo } from '@/api/mainFrame/navBar';
import api from '@/api/backStageSystem/station';
import { browserAccessToken } from '@/api/login/login';
import { Message } from 'element-ui';
import { encrypt, decrypt } from '@/utils/crypto';
import { gengerateID } from '@/utils/util';
import QRCode from 'qrcodejs2';

export default {
  data ()
  {
    return {
      userLoginShow: true,
      userLoginTitleShow: true,
      mobileLoginShow: false,
      mobileLoginTitleShow: true,
      qrCodeLoginShow: false,
      qrCodeLoginTitleShow: false,
      /* 随机字符串 */
      uuid: '',
      timer: null,
      nowIndex: 0,
      typeIndex: 0,
      checked: false,
      loginForm: {},
      phone: '',
      checkCode: '',
      stationName: '',
      systemLogo: '',
      chromeUrl: ''
    };
  },
  computed: {
    ...mapGetters([
      'projectList'
    ])
  },
  created ()
  {
    this.$nextTick(() =>
    {
      this.showQrCode();
    });
    if (localStorage.getItem('username') && localStorage.getItem('password'))
    {
      this.loginForm.userName = decrypt(localStorage.getItem('username'));
      this.loginForm.passWord = decrypt(localStorage.getItem('password'));
    }
    this.checked = localStorage.getItem('checked') === 'true';
    api.getStation({}).then(({ data }) =>
    {
      const station = data.data.entity;
      // 谷歌浏览器
      let chromeNum = station.chrome.groupNode.replace('group', '');
      this.chromeUrl = `${this.$prifix.file}/${chromeNum}/${station.chrome.filePath}`;
      // 系统标题及logo
      this.stationName = station.stationName;
      let nodeNum = station.attachmentVO.groupNode.replace('group', '');
      this.systemLogo = `${this.$prifix.file}/${nodeNum}/${station.attachmentVO.filePath}`;
      localStorage.setItem('stationName', station.stationName);
      localStorage.setItem('systemLogo', `${this.$prifix.file}/${nodeNum}/${station.attachmentVO.filePath}`);
    });
  },
  methods: {
    /**
     * 点击登录按钮登录
     */
    handleLogin ()
    {
      localStorage.setItem('checked', this.checked);
      this.$store.dispatch('login', this.loginForm).then(data =>
      {
        if (this.checked)
        {
          localStorage.setItem('username', encrypt(this.loginForm.userName));
          localStorage.setItem('password', encrypt(this.loginForm.passWord));
        }
        else
        {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
        /* 之所以要用sessionStorage和vuex一起把当前子系统id记住是因为f5刷新页面后就会清除所有vuex数据 */
        if (data)
        {
          getSubSystemInfo().then(res =>
          {
            if (res.data.data && res.data.data.length > 0)
            {
              /* 把当前的子系统id提交到vuex和sessionStorage中 */
              let firstProjectPath = res.data.data[0].url;
              this.$router.push(firstProjectPath);
            }
            else
            {
              Message({
                message: '你没有权限进入该系统!',
                type: 'error',
                duration: 3 * 1000
              });
            }
          });
        }
      });
    },
    /**
     * 点击密码登录和验证码登录切换
     */
    handleClick (index)
    {
      this.nowIndex = index;
      switch (index)
      {
        case 0: { this.userLoginShow = true; this.mobileLoginShow = false; break; }
        case 1: { this.userLoginShow = false; this.mobileLoginShow = true; break; }
      }
    },
    type_switch (index)
    {
      this.typeIndex = index;
      switch (index)
      {
        case 0: {
          this.qrCodeLoginTitleShow = true;
          this.userLoginTitleShow = false;
          this.mobileLoginTitleShow = false;
          this.qrCodeLoginShow = true;
          this.userLoginShow = false;
          this.mobileLoginShow = false;
          this.getAccessToken();
          break; }
        case 1: {
          clearInterval(this.timer);
          this.qrCodeLoginTitleShow = false;
          this.userLoginTitleShow = true;
          this.mobileLoginTitleShow = true;
          this.qrCodeLoginShow = false;
          if (this.nowIndex === 0)
          {
            this.userLoginShow = true;
            this.mobileLoginShow = false;
          }
          else
          {
            this.userLoginShow = false;
            this.mobileLoginShow = true;
          }
          break; }
      }
    },
    /* 生成二维码 */
    showQrCode ()
    {
      document.getElementById('loginCode').innerHTML = '';
      this.uuid = gengerateID();
      const qrcodeUrl = JSON.stringify({redirectTo: 'pcLogin', url: `/authority/oauth/token?browserId=${this.uuid}`});
      this.qrcode = new QRCode('loginCode', {
        width: 132,
        height: 132,
        text: qrcodeUrl,
        colorDark: '#000',
        colorLight: '#fff'
      });
    },
    /**
     * 轮询查看后台是否有请求到accesstoken
     */
    getAccessToken ()
    {
      this.timer = setInterval(() =>
      {
        browserAccessToken({ browserId: this.uuid }).then(({ data }) =>
        {
          clearInterval(this.timer);
          if (data.data.access_token)
          {
            this.$store.dispatch('qrCodeLogin', data.data).then(data =>
            {
              /* 之所以要用sessionStorage和vuex一起把当前子系统id记住是因为f5刷新页面后就会清除所有vuex数据 */
              if (data)
              {
                getSubSystemInfo().then(res =>
                {
                  if (res.data.data && res.data.data.length > 0)
                  {
                    /* 把当前的子系统id提交到vuex和sessionStorage中 */
                    let firstProjectPath = res.data.data[0].url;
                    this.$router.push(firstProjectPath);
                  }
                  else
                  {
                    Message({
                      message: '你没有权限进入该系统!',
                      type: 'error',
                      duration: 3 * 1000
                    });
                  }
                });
              }
            });
          }
        }).catch(e =>
        {
          console.log('error: ' + e);
        });
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/border1px";
.login-wrapper {
  max-width: 100%;
  .title-wrapper {
      height: 72px;
      width:1100px;
      line-height: 72px;
      padding-top: 8px;
      margin: 0 auto;
      .logo {
        width: 159px;
        height: 31px;
        display: inline-block;
        vertical-align: text-bottom;
      }
    .system-manage {
      font-size: 26px;
      padding-left: 8px;
    }
  }

  .main-wrapper {
    width: 100%;
    height: 520px;
    background: #1e89cd url("./img/loginBg.jpg") no-repeat;
    background-position:center center;
    .login-wrapper{
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .login-box {
        width: 300px;
        height: 290px;
        top: calc(50% - 27%);
        right: 18px;
        position: absolute;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #ddd;
        background: white;

        .type_switch {
          width: 46px;
          height: 46px;
          position: absolute;
          top: 0;
          right: 0;
          background: url('./img/erweiqu.png') no-repeat;
          cursor: pointer;
        }
        .type_switch_pc {
          width: 46px;
          height: 46px;
          position: absolute;
          top: 0;
          right: 0;
          background: url('./img/pc-icon.png') no-repeat;
          cursor: pointer;
        }

        .title {
        margin-bottom: 20px;
        padding-top: 15px;
        ul {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #ddd;

          &:after {
            content: ' ';
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom: 1px solid #ddd;
          }
          li {
            position: relative;
            float: left;
            margin-right: 18px;
            padding-bottom: 12px;
            cursor: pointer;

            &.active {
              color: #FD9063;
              .border-1px(#FD9063);
            }
          }
        }
      }
        .qr-code-login{
          text-align: center;
          #loginCode {
            text-align: center;
            /deep/ img{
              margin: 0 auto;
            }
            &:after{
              content: "贵州公路";
              width: 100%;
              display: block;
              line-height: 35px;
            }
          }
        }

        .el-form-item {
          margin-bottom: 10px;
        }

        .input-group {
          width: 90%;
          margin-bottom: 20px;
          position: relative;
          display: table;
          border-collapse: separate;

          .icon {
          display: table-cell;
          padding: 4px 12px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          color: #555;
          text-align: center;
          background-color: #eee;
          border: 1px solid #ccc;
          border-radius: 4px;
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          width: 1%;
          white-space: nowrap;
          vertical-align: middle;
        }

          .login-input {
          display: table-cell;
          position: relative;
          z-index: 2;
          float: left;
          width: 100%;
          margin-bottom: 0;
          height: 34px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
          -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
          box-sizing: border-box;
        }

          &.validate-code-wrapper {
          width: 55%;
          position: relative;

          .validate-code {
            width: 95px;
            height: 32px;
            position: absolute;
            top: 2px;
          }
        }
      }

        .login-btn {
          width: 100%;
          margin: 10px 0;
        }
     }
    }
  }

  .footer {
    width:1100px;
    margin:12px auto 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .copy-right {
      font-size: 16px;
      color: #333;

      a{
        color: #333;
      }
      a:hover{
        color: red;
      }
      .recommand {
        margin-top: 10px;
        .title;
        letter-spacing: 1px;
        font-size: 13px!important;
        .download {
          font-style: italic;
          &:hover {
            color: yellowgreen;
            text-decoration: underline;
          }
        }
      }
    }

    .erwei-code-wrapper {

      img {
        display: inline-block;
        margin-right: 15px;
        width: 68px;
        height: auto;
      }
    }
  }
}
</style>
