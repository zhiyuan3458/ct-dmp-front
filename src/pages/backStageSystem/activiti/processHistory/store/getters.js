
export default {
  marginLeft: state => state.marginLeft,
  tableList: state => state.tableList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isDetailListShow: state => state.isDetailListShow,
  isListShow: state => state.isListShow,
  activitiEntity: state => state.activitiEntity,
  processInstanceId: state => state.processInstanceId,
  isRefreshList: state => state.isRefreshList,
  isRefreshDetailList: state => state.isRefreshDetailList,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
