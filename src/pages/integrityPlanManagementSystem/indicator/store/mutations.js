import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.isAddEditShow = false;
    state.urlType = data.urlType;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.parentId = data.parentId;
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.parentId = data.parentId;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.isDetailEdit = data.isDetailEdit;
    state.navigateMenus = data.navigateMenus;
    if (state.urlType === 'edit')
    {
      state.operateBtns = data.operateBtns;
    }
    else
    {
      state.operateBtns = [];
    }
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.LISTJSON] (state, data)
  {
    console.log(state.urlType);
    state.tableList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.tableBtns = data.data.tableBtns;
    if (state.urlType === 'show')
    {
      for (let i = 0; i < state.tableBtns.length; i++)
      {
        if (state.tableBtns[i].displayName === '编辑')
        {
          state.tableBtns.remove(state.tableBtns[i]);
        }
      }
    }
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    state.navigateMenus = data.data.navigateMenus;
    if (state.urlType === 'edit')
    {
      state.operateBtns = data.data.operateBtns;
    }
    state.isDetailEdit = false;
  },
  [mutationType.RETURN] (state, data)
  {
    if (state.urlType === 'show')
    {
      state.operateBtns = [];
    }
    state.isRefreshList = !state.isRefreshList;
    state.isRefreshTree = !state.isRefreshTree;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.DESTROYED] (state)
  {
    state.treeList = [];
    state.isAddEditShow = false;
    state.isListShow = false;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
