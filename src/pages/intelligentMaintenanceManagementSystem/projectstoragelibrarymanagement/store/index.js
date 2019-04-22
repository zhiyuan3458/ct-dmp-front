import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      readOnlyTrue: true, // 是否只读
      readOnly: false, // 是否只读
      isAddEditShow: false,
      isRefreshTree: false, // 是否刷新index.vue的树组件
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      indexTreeOperateBtns: '', // index.vue的树组件功能按钮
      formData: {}, // 菜单数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      tableList: {}, // 用户表格list
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 用户表格的表头名
      tableBtns: [], // 表功能按钮
      listProjectStorageLibraryManagementActualSub: '', // 实际完成部分子表
      listProjectStorageLibraryManagementPlanSub: '', // 计划成部分子表
      extraCondition: {} // 额外的查询条件
    };
  },
  getters,
  actions,
  mutations
};
