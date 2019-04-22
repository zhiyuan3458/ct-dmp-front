import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      readOnly: false, // 判断模块表单是否为只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isRefresh: false, // 是否刷新列表
      isLoading: false, // 数据加载动画显示
      formData: {}, // 表单数据
      treeBtns: [], // 树按钮
      tableList: {}, // 数据内容list(包含listData,pageNum,pageSize,total,pages)
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 用户表格的表头名
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};