
export default {
  marginLeft: state => state.marginLeft,
  tableList: state => state.tableList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  category: state => state.category,
  userClick: state => state.userClick,
  formData: state => state.formData,
  userTree: state => state.userTree,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isRefreshList: state => state.isRefreshList,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
