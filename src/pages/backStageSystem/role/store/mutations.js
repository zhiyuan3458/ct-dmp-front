import mutationType from './mutation-type';
const mutations = { // mutation
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.GET_USERTREE] (state, data)
  {
    state.userTree = data;
  },
  [mutationType.SAVE] (state, data)
  {
    state.isRefreshTree = false;
    state.formData = data.entity;
    state.isRefreshTree = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
