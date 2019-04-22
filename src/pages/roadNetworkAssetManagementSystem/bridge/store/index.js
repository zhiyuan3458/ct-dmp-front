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
      deptId: '', // 部门Id
      treeList: [], // 树组件数据
      formData: {}, // 桥梁表单数据
      gridEntityInfo: {}, // 表名信息
      listGridColumnInfo: [], // 桥梁表格的表头名
      tableList: {}, // 桥梁表格list
      tableBtns: [], // 表功能按钮
      ztreeSelect: [], // 桥梁部门选择select框数据
      listBridgeTech: '', // 桥梁卡片技术状况评定列表信息数据
      listBridgeRecord: '', // 桥梁卡片修建记录列表信息数据
      listBridgeSubStructure: '', // 桥梁卡片下部结构列表信息数据
      listBridgeSupStructure: '', // 桥梁卡片上部结构列表信息数据
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      qrCodeData: null // 二维码相关数据
    };
  },
  getters,
  actions,
  mutations
};
