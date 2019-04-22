import Vue from 'vue';
import store from '@/vuex/index.js';
import ElementUI from 'ct-element-ui';
import AMapManager from 'vue-amap';
import prifix from '@/common/js/urlPrifix';
/* 引入echarts */
import echarts from 'echarts';
/* 修复浏览器自带样式 */
import 'common/less/reset.css';
/* elementui主题样式 */
import 'ct-element-ui/lib/theme-chalk/index.css';
/* 字体图标库 */
import '@/common/less/ct-fonts.less';
import request from '@/utils/request';
import '@/components/global.js';
import './permission';
import common from './common/js/common';
import constant from './common/js/constant';
import '@/utils/util.js';
import 'babel-polyfill';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import '../plugins/ztree/css/zTreeStyle.css';
import '../plugins/ztree/js/jquery.ztree.all.min.js';
import validate from '@/utils/validate';
import router from './router';
import App from './App.vue';

Vue.prototype.$axios = request;
Vue.prototype.$echarts = echarts;
Vue.prototype.$common = common;
Vue.prototype.$constant = constant;
Vue.prototype.$validate = validate;
Vue.prototype.$prifix = prifix;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(AMapManager);

// 初始化vue-amap
AMapManager.initAMapApiLoader({
  // 高德的key
  key: '99ce2352b45962d8898c6b4c1456747d',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
