import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_ORGANRELATION_TREE] (state, data)
  {
    state.organrelationTreeList = data.organrelationTreeList;
    state.deptId = data.deptId;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isListShow = true;
  },
  [mutationType.GET_TREE] (state, data)
  {
    state.treeList = data.ztreeList;
  },
  [mutationType.SAVE] (state, data)
  {
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
