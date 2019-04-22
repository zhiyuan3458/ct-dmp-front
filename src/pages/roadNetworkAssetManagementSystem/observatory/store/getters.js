export default {
  readOnly: state => state.readOnly,
  treeList: state => state.treeList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  tableList: state => state.tableList,
  deptId: state => state.deptId,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isLoading: state => state.isLoading,
  tableBtns: state => state.tableBtns,
  ztreeSelect: state => state.ztreeSelect,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar,
  qrCodeUrl: state => state.qrCodeUrl
};
