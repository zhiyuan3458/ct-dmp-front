import mutationType from './mutation-type';
const mutations = {
  [mutationType.SHOW_LIST] (state, data)
  {
    state.cityId = data.cityId;
    state.isRefresh = !state.isRefresh;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.CURRENTLISTJSON] (state, data)
  {
    state.currentList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.currentGridEntityInfo = data.data.gridEntityInfo;
    state.currentGridEntityInfo.showOperateColumn = false;
    state.currentListGridColumnInfo = data.data.listGridColumnInfo;
    state.tableBtns = data.data.tableBtns;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.HISTORYLISTJSON] (state, data)
  {
    state.historyList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.historyGridEntityInfo = data.data.gridEntityInfo;
    state.historyGridEntityInfo.showOperateColumn = false;
    state.historyListGridColumnInfo = data.data.listGridColumnInfo;
  },
  [mutationType.FUTURELISTJSON] (state, data)
  {
    state.futureList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.futureGridEntityInfo = data.data.gridEntityInfo;
    state.futureGridEntityInfo.showOperateColumn = false;
    state.futureListGridColumnInfo = data.data.listGridColumnInfo;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },

  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
