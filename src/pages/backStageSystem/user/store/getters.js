export default {
  marginLeft: state => state.marginLeft,
  readOnly: state => state.readOnly,
  isRefreshTree: state => state.isRefreshTree,
  treeList: state => state.treeList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  tableList: state => state.tableList,
  deptId: state => state.deptId,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isLoading: state => state.isLoading,
  roleTree: state => state.roleTree,
  deptTree: state => state.deptTree,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
