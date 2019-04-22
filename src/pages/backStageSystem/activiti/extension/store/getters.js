
export default {
  marginLeft: state => state.marginLeft,
  versionId: state => state.versionId,
  starter: state => state.starter,
  nodeSetting: state => state.nodeSetting,
  senior: state => state.senior,
  nodeSenior: state => state.nodeSenior,
  userTree: state => state.userTree,
  roleTree: state => state.roleTree,
  userHandler: state => state.userHandler,
  roleHandler: state => state.roleHandler,
  userReaderTree: state => state.userReaderTree,
  roleReaderTree: state => state.roleReaderTree,
  processDefinitionId: state => state.processDefinitionId,
  isSettingShow: state => state.isSettingShow,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  nodeMenus: state => state.nodeMenus,
  nodeBtns: state => state.nodeBtns,
  isLoading: state => state.isLoading,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
