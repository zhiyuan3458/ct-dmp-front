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
      readOnly: true, // 判断模块表单是否为只读
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isRefreshTree: false, // 是否刷新index.vue的树
      isLoading: false, // 数据加载动画显示
      saveOrUpdateId: '', // 数据字典保存更新之后传输的id
      saveOrUpdateValue: '', // 数据字典保存更新之后传输的value
      dictionaryCode: '', // 数据字典编码值
      formData: {}, // 数据字典表单数据
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