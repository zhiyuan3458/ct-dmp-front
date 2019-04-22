export default {
  isRefreshTree: state => state.isRefreshTree,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  menuPages: state => state.menuPages,
  operateBtns: state => state.operateBtns,
  navigateMenus: state => state.navigateMenus,
  indexTreeOperateBtns: state => state.indexTreeOperateBtns,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar,
  tableList: state => state.tableList,
  systemId: state => state.systemId,
  tableBtns: state => state.tableBtns,
  isLoading: state => state.isLoading,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  isListShow: state => state.isListShow
};
