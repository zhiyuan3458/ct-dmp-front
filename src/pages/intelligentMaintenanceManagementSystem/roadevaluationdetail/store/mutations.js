import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.roadDetail = data;
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
  },
  [mutationType.LISTJSON] (state, data)
  {
    state.formData = data.entity;
    state.tableList = {
      listData: data.page.content,
      pageNum: data.page.pageNum,
      pageSize: data.page.size,
      total: data.page.totalElements,
      pages: data.page.totalPages
    };
    state.tableBtns = data.tableBtns;
    state.gridEntityInfo = data.gridEntityInfo;
    state.gridEntityInfo.showOperateColumn = false;
    state.listGridColumnInfo = data.listGridColumnInfo;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
