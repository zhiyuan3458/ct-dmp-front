import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isListShow: false, // 是否显示list组件
      organrelationTreeList: [], // 基础数据组织树数据
      deptId: '', // 部门Id
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      isLoading: false // 是否显示'加载中动画'
    };
  },
  getters,
  actions,
  mutations
};
