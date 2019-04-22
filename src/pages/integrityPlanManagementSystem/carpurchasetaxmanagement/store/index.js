import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isAddEditShow: false, // 是否显示addEdit组件
      isLoading: false, // 数据加载动画显示
      formData: {}, // 表单数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      isRefresh: false // 是否刷新树
    };
  },
  getters,
  actions,
  mutations
};
