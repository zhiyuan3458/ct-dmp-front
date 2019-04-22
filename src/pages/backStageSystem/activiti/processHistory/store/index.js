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
      isAddEditShow: false, // 是否显示addEdit组件
      isDetailListShow: false, // 是否显示详细list组件
      isListShow: false, // 是否显示list组件
      isRefreshList: false, // 是否刷新列表
      isRefreshDetailList: false, // 是否刷新详细任务列表
      isLoading: false, // 数据加载动画显示
      activitiEntity: '', // 工作流entity，用于传递参数
      processInstanceId: '', // 流程实例id
      formData: {}, // 表单数据
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
