export default {
  readOnly: state => state.readOnly,
  currentList: state => state.currentList,
  historyList: state => state.historyList,
  futureList: state => state.futureList,
  cityId: state => state.cityId,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isRefresh: state => state.isRefresh,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  currentGridEntityInfo: state => state.currentGridEntityInfo,
  currentListGridColumnInfo: state => state.currentListGridColumnInfo,
  historyGridEntityInfo: state => state.historyGridEntityInfo,
  historyListGridColumnInfo: state => state.historyListGridColumnInfo,
  futureGridEntityInfo: state => state.futureGridEntityInfo,
  futureListGridColumnInfo: state => state.futureListGridColumnInfo
};
