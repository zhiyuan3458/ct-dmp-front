import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import constant from '@/common/js/constant';

export default {
  namespaced: true,
  state ()
  {
    return {
      marginLeft: constant.MARGIN_LEFT,
      readOnly: false, // 是否只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isRefreshTree: false, // 是否刷新index.vue的树
      isLoading: false, // 数据加载动画显示
      deptId: '', // 部门Id
      roleTree: [], // 角色树
      deptTree: [], // 部门树
      treeList: [], // 树组件数据
      formData: {}, // 用户表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 用户表格的表头名
      tableList: {}, // 用户表格list
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
