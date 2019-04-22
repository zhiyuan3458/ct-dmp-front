export default {
  readOnly: state => state.readOnly,
  tableList: state => state.tableList,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  dictionaryCode: state => state.dictionaryCode,
  isRefreshTree: state => state.isRefreshTree,
  saveOrUpdateId: state => state.saveOrUpdateId,
  saveOrUpdateValue: state => state.saveOrUpdateValue,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
