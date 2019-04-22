import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state ()
  {
    return {
      isAddEditShow: false, // 是否显示addEdit组件
      isListShow: false, // 是否显示list组件
      isLoading: false, // 数据加载动画显示
      saveOrUpdateId: '', // 保存更新之后传输的id
      saveOrUpdateValue: '', // 数据字典保存更新之后传输的value
      search: '', // 检索对象值
      formData: {}, // 数据字典表单数据
      tableList: [], // 数据内容list
      indexList: [], // 文档索引数据
      typeList: [], // 文档类型数据
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [] // 功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
