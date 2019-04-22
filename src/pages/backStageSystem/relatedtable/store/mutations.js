import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.isRefreshTree = false;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data.entity;
    state.isRefreshTree = data.isRefreshTree;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.relatedTableId = data.id;
    state.isListShow = true;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.systemList = data.systemList;
    state.isListShow = false;
    state.isAddEditShow = true;
    state.isAddEditDetailShow = false;
  },
  [mutationType.EDIT_DETAIL] (state, data)
  {
    state.formDataDetail = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.systemList = data.systemList;
    state.isListShow = false;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.systemList = data.systemList;
    state.isListShow = false;
    state.isAddEditShow = true;
    state.isAddEditDetailShow = false;
  },
  [mutationType.REMOVE] (state, data)
  {
    state.isRefreshTree = true;
  },
  [mutationType.LIST] (state, data)
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
  [mutationType.ADD_DETAIL] (state, data)
  {
    data.entity.type = '';
    data.entity.validateType = '';
    state.formDataDetail = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isListShow = false;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = true;
  },
  [mutationType.SAVE_DETAIL] (state, data)
  {
    state.formDataDetail = data;
  },
  [mutationType.SHOW_DETAIL] (state, data)
  {
    state.formDataDetail = data.entity;
    state.readOnly = data.readOnly;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isListShow = false;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = true;
  },
  [mutationType.REMOVE_DETAIL] (state, data)
  {
  }
};

export default mutations;
