import mutationType from './mutation-type';
const mutations = {
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data;
    state.isRefresh = !state.isRefresh;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
