import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.category = data.category;
    state.userClick = data.userClick;
    state.isRefreshList = !state.isRefreshList;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.TRANSFER] (state, data)
  {
    state.formData = data.entity;
    state.userTree = data.userTree;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.LISTJSON] (state, data)
  {
    state.tableList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    state.tableBtns = data.data.tableBtns;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  },
  [mutationType.RETURN] (state, data)
  {
    state.isRefreshList = !state.isRefreshList;
    state.isAddEditShow = false;
    state.isListShow = true;
  }
};

export default mutations;
