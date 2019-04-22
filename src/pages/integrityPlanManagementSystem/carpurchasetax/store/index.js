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
      carPurchaseTax: {}, // 列表搜索条件
      formDataParams: {}, // 编辑页后台参数
      editParams: {}, // 编辑页参数，包括合计和市县数据
      treeList: [], // 树组件数据
      formData: {}, // 表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 表格的表头名
      tableList: {}, // 表格list
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      investmentStatusSub: '', // 投资情况子表
      suggestedPlanSub: '', // 建议计划子表
      isRefreshList: false // 是否刷新列表
    };
  },
  getters,
  actions,
  mutations
};
