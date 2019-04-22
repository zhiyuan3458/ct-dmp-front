export default {
  isRefreshTree: state => state.isRefreshTree,
  formData: state => state.formData,
  isLoading: state => state.isLoading,
  isAddEditShow: state => state.isAddEditShow,
  operateBtns: state => state.operateBtns,
  navigateMenus: state => state.navigateMenus,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar,
  readOnly: state => state.readOnly
};
