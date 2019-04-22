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
      cityId: '', // 城市id
      formData: {}, // 表单数据
      currentList: {}, // 当天list(包含listData,pageNum,pageSize,total,pages)
      currentGridEntityInfo: {}, // 表名信息
      currentListGridColumnInfo: [], // 用户表格的表头名
      historyList: {}, // 历史list(包含listData,pageNum,pageSize,total,pages)
      historyGridEntityInfo: {}, // 表名信息
      historyListGridColumnInfo: [], // 用户表格的表头名
      futureList: {}, // 未来6天list(包含listData,pageNum,pageSize,total,pages)
      futureGridEntityInfo: {}, // 表名信息
      futureListGridColumnInfo: [], // 用户表格的表头名
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
