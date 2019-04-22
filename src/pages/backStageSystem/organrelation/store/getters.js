export default {
  isListShow: state => state.isListShow,
  deptId: state => state.deptId,
  isLoading: state => state.isLoading,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  organrelationTreeList: state => state.organrelationTreeList,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
