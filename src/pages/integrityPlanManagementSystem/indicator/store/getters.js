export default {
  readOnly: state => state.readOnly,
  treeList: state => state.treeList,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  tableList: state => state.tableList,
  parentId: state => state.parentId,
  isDetailEdit: state => state.isDetailEdit,
  formData: state => state.formData,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  isLoading: state => state.isLoading,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isRefreshList: state => state.isRefreshList,
  isRefreshTree: state => state.isRefreshTree,
  urlType: state => state.urlType
};
