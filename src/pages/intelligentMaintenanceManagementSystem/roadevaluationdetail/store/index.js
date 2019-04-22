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
      isRefreshList: false, // 是否刷新列表
      treeList: [], // 树组件数据
      formData: {}, // 表单数据
      roadDetail: {}, // 公路技术状况评定明细
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 列表信息
      tableList: {}, // 表格list
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
