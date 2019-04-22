import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      readOnly: true, // 是否只读
      btnShow: true,
      delBtnShow: true,
      readOnlyTrue: true, // 是否只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      deptIds: '', // 部门Id
      extraCondition: {}, // 额外的查询条件
      treeList: [], // 树组件数据
      formData: {}, // 涵洞经常性检查记录表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 涵洞经常性检查记录表格的表头名
      tableList: {}, // 涵洞经常性检查表格list
      listCulvertOftenRecord: '', // 涵洞经常检查组件记录
      ztreeSelect: [], // 桥梁部门选择select框数据
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      IsIndex: true
    };
  },
  actions,
  getters,
  mutations
};
