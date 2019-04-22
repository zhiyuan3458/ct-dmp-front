export default {
  treeList: state => state.treeList,
  isRefreshTree: state => state.isRefreshTree,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
