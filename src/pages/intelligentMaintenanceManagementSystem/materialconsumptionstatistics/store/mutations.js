import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
