
export default {
  tableList: state => state.tableList,
  isListShow: state => state.isListShow,
  iconCode: state => state.iconCode,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  gridEntityInfo: state => state.gridEntityInfo,
  listGridColumnInfo: state => state.listGridColumnInfo,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
