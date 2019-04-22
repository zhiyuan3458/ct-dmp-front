import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      iconCode: '', // 图标编码值
      tableList: {}, // 数据内容list
      tableBtns: [], // 表功能按钮
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 图标表格列名
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
