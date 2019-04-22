import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.ADDCATEGORY] (state, data)
  {
    state.categoryNode = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddCategoryShow = true;
    state.isAddEditShow = false;
    state.isListShow = false;
  },
  [mutationType.SAVECATEGORY] (state, data)
  {
    state.categoryNode = data;
    state.isRefreshTree = !state.isRefreshTree;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.isImgShow = false;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.processdefinition = data;
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    if (data.entity.deploymentId !== undefined)
    {
      state.isImgShow = true;
    }
    state.readOnly = true;
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
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    if (data.entity.deploymentId !== undefined)
    {
      state.isImgShow = true;
    }
    state.isAddEditShow = true;
    state.isListShow = false;
    state.readOnly = data.readOnly;
  },
  [mutationType.RETURNfN] (state, data)
  {
    state.isRefreshList = !state.isRefreshList;
    state.isAddEditShow = false;
    state.isListShow = true;
  }
};

export default mutations;
