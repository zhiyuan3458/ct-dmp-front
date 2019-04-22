export default {
  isListShow: state => state.isListShow,
  isAddEditShow: state => state.isAddEditShow,
  isAddEditDetailShow: state => state.isAddEditDetailShow,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  relatedTableId: state => state.relatedTableId,
  tableList: state => state.tableList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  tableBtns: state => state.tableBtns,
  isLoading: state => state.isLoading,
  formData: state => state.formData,
  formDataDetail: state => state.formDataDetail,
  isRefreshTree: state => state.isRefreshTree,
  readOnly: state => state.readOnly,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar,
  systemList: state => state.systemList
};
