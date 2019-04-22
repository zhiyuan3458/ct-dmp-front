import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    // state.deptId = data;
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.isIndex = false;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.isIndex = false;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listCulvertRegularRecord = data.listCulvertRegularRecord;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.isIndex = false;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listRoadbedSubDamageCheck = data.listRoadbedSubDamageCheck;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = true;
  },
  [mutationType.LISTJSON] (state, data)
  {
    state.isListShow = true;
    state.tableList = {
      listData: data.data.tableList
      // pageNum: data.pageNum,
      // pageSize: data.pageSize,
      // total: data.total,
      // pages: data.pages
    };
    // state.tableBtns = data.data.tableBtns;
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    // state.navigateMenus = data.data.navigateMenus;
    // state.operateBtns = data.data.operateBtns;
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
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  },
  [mutationType.LIST_CULVERT] (state, data)
  {
    state.listCulvertRegularRecord = data;
  }
};

export default mutations;
