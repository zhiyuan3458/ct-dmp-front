import mutationType from './mutation-type';
const mutations = {
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.bridgetunneldamageSub = data.list;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
    state.isAddEditShow = true;
    state.isListShow = false;
  }
};

export default mutations;
