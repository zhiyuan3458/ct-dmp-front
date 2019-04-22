import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user/user';
import tagsView from './modules/tagsView';
import app from './modules/app/app';
import shortcut from './modules/shortcut/shortcut';
import permission from './modules/permission/permission';
import deskSetting from './modules/deskSetting/deskSetting';
import getters from './getter';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
    app,
    shortcut,
    permission,
    deskSetting
  },
  getters
});

export default store;
