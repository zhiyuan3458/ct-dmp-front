import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default { // index
  namespaced: true,
  state ()
  {
    return {
      isAddEditShow: false,
      formData: {}, // 角色数据
      userTree: [], // 用户树
      isLoading: false, // 是否展示加载中动画
      isRefreshTree: false, // 是否刷新index树
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
