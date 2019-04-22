import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.isRefreshTree = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.deptExtend = data.deptExtend ? data.deptExtend : {};
    state.listDeptExtendDetail = JSON.stringify(data.listDeptExtendDetail);
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data.entity;
    state.deptExtend = data.deptExtend ? data.deptExtend : {};
    state.listDeptExtendDetail = JSON.stringify(data.listDeptExtendDetail);
    state.isRefreshTree = data.isRefreshTree;
  },
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.deptExtend = data.deptExtend ? data.deptExtend : {};
    state.listDeptExtendDetail = JSON.stringify(data.listDeptExtendDetail);
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
  }
};

export default mutations;
