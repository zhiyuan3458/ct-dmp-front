import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isAddEditShow: false,
      isRefreshTree: false, // 是否刷新index.vue的树组件
      formData: {}, // 菜单数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      readOnly: false // 是否只读
    };
  },
  getters,
  actions,
  mutations
};
