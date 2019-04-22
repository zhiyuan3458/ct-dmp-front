import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_ROLE_TREE] (state, data)
  {
    state.treeList = data.ztreeList;
    state.isRefreshTree = false;
  },
  [mutationType.GET_TREE] (state, data)
  {
    state.permissionTreeList = data.ztreeList;
    state.roleId = data.roleId;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isListShow = true;
  },

  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
