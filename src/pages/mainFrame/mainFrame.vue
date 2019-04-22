<template>
<div class="main-frame">
  <div class="modal-bg" v-show="modalBgShow"></div>
  <!-- 头部 -->
  <v-header class="header"></v-header>
  <div class="body-wrapper">
    <!-- 侧导航栏 -->
    <side-bar class="side-bar" :style="{height: sideBarHeight}"></side-bar>
    <!-- 右侧主内容和项目导航栏 -->
    <div class="main">
      <div class="main-container-wrapper" :style="{height: mainContentHeight}" ref="mainContainerWrapper">
        <router-view></router-view>
      </div>
      <!-- 项目导航栏 -->
      <nav-bar class="navBar"></nav-bar>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import header from '@/pages/mainFrame/components/header.vue';
import navBar from '@/pages/mainFrame/components/navBar.vue';
import sideBar from '@/pages/mainFrame/components/sideBar.vue';
const headerHeight = 47;
const navBarHeight = 32;
/* global $ */
export default {
  components: {
    'v-header': header,
    sideBar,
    navBar
  },
  computed: {
    ...mapGetters([
      'sideBar',
      'modalBgShow',
      'sideBarHeight',
      'mainContentHeight'
    ]),
    isOpen ()
    {
      return this.sideBar.opened;
    }
  },
  watch: {
    isOpen: {
      handler ()
      {
        this.setHeight();
      },
      immediate: true
    }
  },
  mounted ()
  {
    this.setHeight();
    window.onresize = () =>
    {
      setTimeout(() =>
      {
        this.setHeight();
      }, 20);
    };
  },
  methods: {
    setHeight ()
    {
      let tableHeight = document.body.offsetHeight - 136 - 38 - 36;
      let sideBarHeight = document.body.offsetHeight - headerHeight;
      let mainContentHeight, treeHeight;
      if (this.sideBar.opened)
      {
        $('.navBar').animate({
          bottom: '0'
        }, 500);
        mainContentHeight = document.body.offsetHeight - headerHeight - navBarHeight;
        tableHeight = document.body.offsetHeight - 136 - 38 - 36;
        treeHeight = document.body.offsetHeight - headerHeight - navBarHeight;
      }
      else
      {
        $('.navBar').animate({
          bottom: '-32px'
        }, 500);
        mainContentHeight = document.body.offsetHeight - headerHeight;
        tableHeight = document.body.offsetHeight - 136 - 38 - 5;
        treeHeight = document.body.offsetHeight - headerHeight;
      }
      let obj = {
        sideBarHeight,
        mainContentHeight,
        tableHeight,
        treeHeight
      };
      this.$store.dispatch('setHeight', obj);
    }
  }
};
</script>

<style lang="less">
.main-frame {
  width: 100%;

  .modal-bg {
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(7, 17, 27, 0.3);
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 0;
  }

  & > .header {
    height: 47px;
  }

  .body-wrapper {
    overflow: hidden;
    .side-bar {
      float: left;
      z-index: 1000;
    }

    .main {
      overflow: hidden;
      .main-container-wrapper {
        height: 100%;
        overflow: hidden;
      }
      .navBar {
        width: calc(100% - 43px);
        height: 32px;
        line-height: 32px;
        position: absolute;
        bottom: 0;
        z-index: 800;
      }
    }
  }
}
</style>
