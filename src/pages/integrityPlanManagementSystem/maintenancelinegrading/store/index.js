import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      readOnly: false, // 是否只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      formData: {}, // 表单数据
      mlgParams: {}, // 养护线路分等参数，包括extraCondition,routeCode
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 表格的表头名
      tableList: {}, // 表格list
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      maintenanceLineGradingSub: '', // 养护线路分等子表
      isRefreshList: false, // 是否刷新列表
      unitList: [] // 单位树
    };
  },
  getters,
  actions,
  mutations
};
