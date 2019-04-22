import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isListShow: false, // 是否显示list组件
      isAddEditShow: false, // 是否显示AddEdit组件
      isAddEditDetailShow: false, // 是否显示AddEditDetail组件
      isRefreshTree: false, // 是否刷新index.vue的树组件
      isLoading: false, // 数据加载动画显示
      formData: {}, // 关联表表单数据
      readOnly: false, // 是否只读
      formDataDetail: {}, // 关联表表单详情数据
      tableList: {}, // 数据内容list(包含listData,pageNum,pageSize,total,pages)
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 用户表格的表头名
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      relatedTableId: '', // 关联表Id
      systemList: [] // 子系统
    };
  },
  getters,
  actions,
  mutations
};
