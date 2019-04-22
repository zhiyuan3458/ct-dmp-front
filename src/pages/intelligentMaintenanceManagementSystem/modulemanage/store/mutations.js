import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.isRefreshTree = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditDetailShow = false;
    state.isAddEditShow = true;
  },
  [mutationType.EDIT_DETAIL] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = true;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data.entity;
    state.isRefreshTree = true;
    state.isAddEditShow = false;
    state.isAddEditDetailShow = false;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  }
};

export default mutations;
