import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.isRefreshTree = false;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.deptId = data;
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.formSex = data.formSex;
    state.formEducation = data.formEducation;
    state.formJobPosition = data.formJobPosition;
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
    state.tableBtns = data.data.tableBtns;
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.GET_ROLETREE] (state, data)
  {
    state.roleTree = data.ztreeList;
  },
  [mutationType.GET_DEPTTREE] (state, data)
  {
    state.deptTree = data.ztreeList;
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
    state.isRefreshTree = false;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
