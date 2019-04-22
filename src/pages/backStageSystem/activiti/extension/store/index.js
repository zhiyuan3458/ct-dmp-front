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
      isSettingShow: false, // 是否显示设置组件
      isLoading: false, // 数据加载动画显示
      versionId: '', // 流程定义版本节点id
      starter: {}, // 启动者设置表单数据
      nodeSetting: {}, // 节点设置表单数据
      senior: {}, // 高级属性设置数据
      nodeSenior: {}, // 节点高级属性数据
      userTree: [], // 用户树
      roleTree: [], // 角色树
      userHandler: [], // 处理者用户树
      roleHandler: [], // 处理者角色树
      userReaderTree: [], // 读者用户树
      roleReaderTree: [], // 读者角色树
      processDefinitionId: '', // 流程定义id
      navigateMenus: [], // 导航栏数据
      operateBtns: [], // 功能按钮数据
      nodeMenus: [], // 节点编辑导航栏数据
      nodeBtns: [] // 节点编辑功能按钮数据
    };
  },
  getters,
  actions,
  mutations
};
