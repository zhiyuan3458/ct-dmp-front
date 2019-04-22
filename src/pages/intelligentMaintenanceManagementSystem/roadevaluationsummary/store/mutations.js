import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.roadevaluationsummarySub = data.list;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
    state.isAddEditShow = true;
    state.isListShow = false;
  }
};

export default mutations;
