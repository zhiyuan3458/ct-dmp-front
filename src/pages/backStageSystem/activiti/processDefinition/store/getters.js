
export default {
  marginLeft: state => state.marginLeft,
  tableList: state => state.tableList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  formData: state => state.formData,
  processdefinition: state => state.processdefinition,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isRefreshList: state => state.isRefreshList,
  isImgShow: state => state.isImgShow,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  readOnly: state => state.readOnly,
  categoryNode: state => state.categoryNode,
  isAddCategoryShow: state => state.isAddCategoryShow,
  isRefreshTree: state => state.isRefreshTree,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
