
export default {
  tableList: state => state.tableList,
  formData: state => state.formData,
  indexList: state => state.indexList,
  typeList: state => state.typeList,
  isAddEditShow: state => state.isAddEditShow,
  isListShow: state => state.isListShow,
  search: state => state.search,
  saveOrUpdateValue: state => state.saveOrUpdateValue,
  indexTreeOperateBtns: state => state.indexTreeOperateBtns,
  tableBtns: state => state.tableBtns,
  navigateMenus: state => state.navigateMenus,
  operateBtns: state => state.operateBtns,
  isLoading: state => state.isLoading,
  sideBar: (state, getters, rootState, rootGetters) => rootGetters.sideBar
};
