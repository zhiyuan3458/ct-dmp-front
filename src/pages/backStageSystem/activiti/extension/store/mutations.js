import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_MARGIN_LEFT] (state, data)
  {
    state.marginLeft = data;
  },
  [mutationType.STARTEREIDT] (state, data)
  {
    state.versionId = data.versionId;
    state.starter = data.entity;
    state.userTree = data.userTree;
    state.roleTree = data.roleTree;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
  },
  [mutationType.FLOWCHART] (state, data)
  {
    state.processDefinitionId = data.processDefinitionId;
  },
  [mutationType.NODEEIDT] (state, data)
  {
    state.nodeSetting = data.entity;
    state.coords = data.coords;
    state.userHandler = data.userHandler;
    state.roleHandler = data.roleHandler;
    state.userReaderTree = data.userReaderTree;
    state.roleReaderTree = data.roleReaderTree;
    state.nodeMenus = data.navigateMenus;
    state.nodeBtns = data.operateBtns;
  },
  [mutationType.NODESENIOREDIT] (state, data)
  {
    state.nodeSenior = data.entity;
  },
  [mutationType.SENIORSETTING] (state, data)
  {
    state.senior = data.entity;
    state.isSettingShow = true;
  },
  [mutationType.SETDATA] (state, data)
  {
    if (data.starter !== undefined)
    {
      state.starter = data.starter;
    }
    if (data.nodeSetting !== undefined)
    {
      state.nodeSetting = data.nodeSetting;
    }
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
