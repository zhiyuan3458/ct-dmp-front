import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      showWidth: true,
      readOnly: true, // 是否只读
      readOnlyTrue: true, // 是否只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      deptIds: '', // 部门Id
      extraCondition: {}, // 额外的查询条件
      treeList: [], // 树组件数据
      formData: {}, // 记录表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 记录表格的表头名
      tableList: {}, // 表格list
      listPatrolRecordSub: '', // 子表
      ztreeSelect: [], // 桥梁部门选择select框数据
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      isIndex: true
    };
  },
  actions,
  getters,
  mutations
};
