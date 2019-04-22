import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.EDIT] (state, data)
  {
    if (data.entity !== null)
    {
      state.formData = data.entity;
    }
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
