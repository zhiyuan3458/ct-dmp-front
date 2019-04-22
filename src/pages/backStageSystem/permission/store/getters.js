export default {
  isListShow: state => state.isListShow,
  roleId: state => state.roleId,
  isLoading: state => state.isLoading,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  permissionTreeList: state => state.permissionTreeList,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
