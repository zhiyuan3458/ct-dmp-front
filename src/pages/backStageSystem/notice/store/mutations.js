import mutationType from './mutation-type';
const mutations = {
  [mutationType.SHOW_LIST] (state, data)
  {
    state.category = data.category;
    state.extraCondition = data.extraCondition;
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
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
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.userTree = data.userTree;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.userTree = data.userTree;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.userTree = data.userTree;
    console.log(data.userTree);
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.RETURN] (state, data)
  {
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
  }
};

export default mutations;
