import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.GET_TREE] (state, data)
  {
    state.middleTreeList = data.ztreeList;
    state.indexTreeOperateBtns = data.indexTreeOperateBtns;
    state.isAddEditShow = false;
    state.isDetailListShow = false;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.processInstanceId = data.processInstanceId;
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
    state.isAddEditShow = false;
    state.isDetailListShow = true;
    state.isListShow = false;
    state.isRefreshList = false;
    state.isRefreshDetailList = false;
  },
  [mutationType.SHOWDETAIL] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.tableBtns = data.tableBtns;
    state.isAddEditShow = true;
    state.isDetailListShow = false;
    state.isListShow = false;
    state.isRefreshList = false;
    state.isRefreshDetailList = false;
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
    state.activitiEntity = data;
    state.isAddEditShow = false;
    state.isDetailListShow = false;
    state.isListShow = true;
  },
  [mutationType.RETURN] (state, data)
  {
    state.isRefreshDetailList = data.isRefreshDetailList;
    state.isListShow = data.isRefreshList;
    state.isRefreshList = data.isRefreshList;
    state.isAddEditShow = false;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
