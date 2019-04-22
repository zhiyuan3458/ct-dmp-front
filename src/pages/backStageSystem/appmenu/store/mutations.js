import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.treeList = data.ztreeList;
    state.isRefreshTree = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.operateBtns = data.operateBtns;
    state.navigateMenus = data.navigateMenus;
    state.isAddEditShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.operateBtns = data.operateBtns;
    state.navigateMenus = data.navigateMenus;
    state.isAddEditShow = true;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data.entity;
    state.isRefreshTree = data.isRefreshTree;
  },
  [mutationType.REMOVE] (state, data)
  {
    state.isRefreshTree = true;
  }
};

export default mutations;
