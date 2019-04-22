import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.mlgParams = data;
    state.readOnly = false;
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
    state.tableBtns = data.data.tableBtns;
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.unitList = data.unitList;
    state.maintenanceLineGradingSub = data.subList;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.maintenanceLineGradingSub = data.subList;
    state.unitList = data.unitList;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.maintenanceLineGradingSub = data.subList;
    state.unitList = data.unitList;
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
    state.maintenanceLineGradingSub = '';
    state.isRefreshList = !state.isRefreshList;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
