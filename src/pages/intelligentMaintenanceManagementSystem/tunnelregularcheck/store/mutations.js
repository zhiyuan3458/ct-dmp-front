import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.indexTreeOperateBtns = data.indexTreeOperateBtns;
    state.isRefreshTree = false;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    if (data)
    {
      state.deptIds = data.administrationDeptId;
      state.extraCondition = data;
    }
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.readOnly = data.readOnly;
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.listTunnelRegularRecord = data.listTunnelRegularRecord;
    state.ztreeSelect = data.ztreeSelect;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.listTunnelRegularRecord = data.listTunnelRegularRecord;
    state.ztreeSelect = data.ztreeSelect;
  },
  [mutationType.SHOW] (state, data)
  {
    state.ztreeSelect = data.ztreeSelect;
    state.readOnly = data.readOnly;
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.listTunnelRegularRecord = data.listTunnelRegularRecord;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.REMOVE] (state, data)
  {
    state.formData = data;
    state.isRefreshTree = true;
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
  [mutationType.CHANGE_POSITION] (state, data)
  {

  }
};

export default mutations;
