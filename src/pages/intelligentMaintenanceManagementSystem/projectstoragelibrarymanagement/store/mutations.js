import mutationType from './mutation-type';
const mutations = {
  [mutationType.SHOW_LIST] (state, data)
  {
    if (data)
    {
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
    state.listProjectStorageLibraryManagementActualSub = data.listProjectStorageLibraryManagementActualSub;
    state.listProjectStorageLibraryManagementPlanSub = data.listProjectStorageLibraryManagementPlanSub;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.listProjectStorageLibraryManagementActualSub = data.listProjectStorageLibraryManagementActualSub;
    state.listProjectStorageLibraryManagementPlanSub = data.listProjectStorageLibraryManagementPlanSub;
  },
  [mutationType.SHOW] (state, data)
  {
    state.readOnly = data.readOnly;
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.listProjectStorageLibraryManagementActualSub = data.listProjectStorageLibraryManagementActualSub;
    state.listProjectStorageLibraryManagementPlanSub = data.listProjectStorageLibraryManagementPlanSub;
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
  }
};

export default mutations;
