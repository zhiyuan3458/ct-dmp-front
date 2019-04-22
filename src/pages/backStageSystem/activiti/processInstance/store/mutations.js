import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.ADD] (state, data)
  {
    state.definitionList = data.entity;
    state.formData.userId = data.userId;
    state.formData.userName = data.userName;
    state.userTree = data.userTree;
    state.roleTree = data.roleTree;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = false;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
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
  [mutationType.SHOW_LIST] (state, data)
  {
    state.isRefreshList = !state.isRefreshList;
    state.activitiEntity = data;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.RETURN] (state, data)
  {
    state.isRefreshList = !state.isRefreshList;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
