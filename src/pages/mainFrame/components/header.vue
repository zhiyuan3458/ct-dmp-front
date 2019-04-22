<template>
  <div>
    <!-- 头部导航栏 -->
    <header class="header">
      <el-row>
        <div class="logo-wrapper">
          <img class="logo" :src="systemLogo">
          <span class="main-title">{{stationName}}</span>
        </div>
        <div class="top-icon-wrapper">
          <div class="icon" @click="clickHome">
            <span class="ct-icon-home-blue iconStyle"></span>
          </div>

          <div class="icon">
            <span class="ct-icon-question-blue iconStyle"></span>
          </div>
          <!-- 待办事项 -->
          <message></message>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(3)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 3}">
            <span class="ct-icon-user-light-orange iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span class="el-dropdown-item-text item-icon1" @click="personalMsgSetting">个人信息</span></el-dropdown-item>
              <el-dropdown-item><span class="el-dropdown-item-text item-icon2" @click="deskSettingShow = true">个人工作台</span></el-dropdown-item>
              <el-dropdown-item divided @click.native="logout"><span class="el-dropdown-item-text item-icon3">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-wrapper">
          <el-input
            size="mini"
            v-model="globalSearch"
            placeholder="请输入内容"
            @input="handleSearch"
          ></el-input>
        </div>
      </el-row>
    </header>
    <desk-setting
      v-model="deskSettingShow"
    >
    </desk-setting>
    <user-edit :showDialog.sync="isShowUserEdit"></user-edit>
    <search :show.sync="searchModelShow"></search>
  </div>
</template>

<script type="text/ecmascript-6">
import deskSetting from './deskSetting';
import userEdit from './userEdit.vue';
import Search from '@/pages/mainFrame/components/search';
import Message from '@/pages/mainFrame/components/message';
import { debounce } from '@/utils/util';
import { mapGetters } from 'vuex';

export default {
  components: {
    deskSetting,
    Search,
    userEdit,
    Message
  },
  data ()
  {
    return {
      isShowUserEdit: false, // 是否展示用户资料弹窗
      systemLogo: '',
      stationName: '',
      itemHoverIndex: -1,
      iconMouseEnterLiIndex: -1,
      iconMouseEnterSpanIndex: -1,
      // 选择框的v-model值
      globalSearch: '',
      /* 自定义桌面设置的模态框选项 */
      deskSettingShow: false,
      /* 搜索模态框是否显示和隐藏 */
      searchModelShow: false
    };
  },

  computed: {
    ...mapGetters([
      'modalBgShow'
    ])
  },
  methods: {
    /**
     * 点击搜索框时出现搜索界面
     * @author   lvzhiyuan
     * @date     2018/10/14
     */
    handleSearch: debounce(function (context, args)
    {
      if (args[0] === '')
      {
        context.searchModelShow = false;
      }
      else
      {
        context.searchModelShow = true;
      }
    }, 500),

    /**
     * 点击home按钮回到首页
     * @author   lvzhiyuan
     * @date     2018/10/14
    */
    clickHome ()
    {
      let indexRoute = this.$route.path.split('/')[1];
      this.$router.push(`/${indexRoute}/index`);
    },
    /**
     * 点击设置个人资料
     * @author   chenguang
     * @date     2018/12/28
     */
    personalMsgSetting ()
    {
      this.isShowUserEdit = true;
    },
    /**
     * 登出
     * @author   lvzhiyuan
     * @date     2018/8/22
     */
    logout ()
    {
      this.$store.dispatch('logout').then(data =>
      {
        if (data)
        {
          sessionStorage.removeItem('currentSubsystemId');
          this.$router.push('/login');
        }
      });
    },
    // 移动进右上角的四个图标触发
    handleEnter (index)
    {
      this.itemHoverIndex = index;
    },
    // 移动出去右上角的四个图标触发
    handleLeave ()
    {
      this.itemHoverIndex = 5;
    }
  },
  created ()
  {
    this.systemLogo = localStorage.getItem('systemLogo');
    this.stationName = localStorage.getItem('stationName');
  }
};
</script>

<style lang="less" scoped>
@import "../../../common/less/theme";
@import "../../../common/less/fonts.css";
@import "../../../common/less/border1px.less";
.item {
  margin-top: 8px;
  margin-right: 40px;
}
/* 头部 */
.header {
  background: #56A2E8;

  .logo-wrapper {
    float: left;
    margin-right: 17px;
    .logo {
      width: 159px;
      height: 31px;
      display: inline-block;
      margin: 8px 0 0 5px;
      position: relative;
    }

    .main-title {
      display: inline-block;
      position: relative;
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 10px;
      vertical-align: super;
      font-weight: 600;

      &:before {
        content: ' ';
        position: absolute;
        left: -8px;
        height: 100%;
        border: 1px solid #ddd;
      }
    }
  }

  .select-wrapper {
    line-height: 45px;
    float: right;

    /deep/ .el-input__inner {
      width: 100%;
      height: 28px;
      line-height: 28px;
      -webkit-appearance: none;
      background-color: #56A2E8;
      border-radius: 15px;
      border: 1px solid white;
      box-sizing: border-box;
      color: white!important;
    }
  }

  .top-icon-wrapper {
    float: right;
    height: 47px;
    line-height: 47px;

    .icon {
      width: 47px;
      height: 100%;
      cursor: pointer;
      text-align: center;
      float: left;

      &:hover {
        background: #3C4B5E;
      }
      /deep/ .el-badge__content.is-fixed {
        width: 18px;
        height: 18px;
        line-height: 17px;
        top: 12px;
        padding: 0;
        border: 0;
      }

      &.active {
        background: #3C4B5E;
      }

      .iconStyle {
        width: 100%;
        height: 100%;
        display: inline-block;
        font-size: 20px;

        &:before {
          color: white;
        }
      }
    }
  }
}
.el-popper{
  top: 36px !important;
  z-index: 2007 !important;
}

.el-dropdown-item-text {
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: inline-block;
  &:before{
    font-family: "iconfont";
    width: 24px;
    height: 24px;
    display: inline-block;
    font-size: 20px;
    padding-top:5px;
  }
}
.item-icon1:before{
  content: "\E90E";
  color: #ff8030;
}
.item-icon2:before{
  content: "\e715";
  color: #39b1ef;
}
.item-icon3:before{
  content: "\e68c";
  color: #e70000;
}
</style>
