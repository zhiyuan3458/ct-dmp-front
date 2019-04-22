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
      parentId: '', // 父节点id
      isDetailEdit: false, // 是否细目编辑
      treeList: [], // 树组件数据
      formData: {}, // 表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 表格的表头名
      tableList: {}, // 表格list
      tableBtns: [], // 表功能按钮
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      isRefreshList: false, // 是否刷新列表
      isRefreshTree: false, // 是否刷新树
      urlType: '' // 请求类型：编辑或查看
    };
  },
  getters,
  actions,
  mutations
};
