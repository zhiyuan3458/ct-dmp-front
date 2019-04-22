import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isLoading: false, // 数据加载动画显示
      isAddEditShow: false, // 是否显示编辑页
      formData: {}, // 数据字典表单数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
