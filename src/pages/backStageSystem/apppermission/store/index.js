import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isListShow: false, // 是否显示list组件
      isRefreshTree: false, // 是否刷新index.vue的树组件
      roleId: '', // 角色id
      isLoading: false,
      permissionTreeList: [], // 权限树数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
