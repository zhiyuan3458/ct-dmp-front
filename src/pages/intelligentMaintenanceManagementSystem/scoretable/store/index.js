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
      isAddEditDetailShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isExtensionShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      deptId: '', // 部门Id
      treeList: [], // 树组件数据
      formData: {}, // 表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 表格的表头名
      tableList: {}, // 表格list
      tableBtns: [], // 表功能按钮
      ztreeSelect: [], // 部门选择select框数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      moduleList: [],
      extraCondition: {},
      scoreTableId: '' // 项目管理实体id
      // bridgeComponent: []
    };
  },
  getters,
  actions,
  mutations
};
