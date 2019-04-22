const bottomHideValue = -32;
const app = {
  state: {
    sideBar: {
      opened: true,
      bottomValue: 0
    },
    modalBgShow: false,
    businessId: '', // 流程业务Id
    refreshTodoTask: false, // 是否同步刷新待办事项通知
    isAddTodoTask: false, // 是否新增待办事项
    tableHeight: '',
    sideBarHeight: '',
    mainContentHeight: '',
    treeHeight: '',
    bulletin: { category: '所有事宜', userClick: '所有事宜' } // 待办事项和公告通知
  },

  mutations: {
    TOGGLE_SIDEBAR: state =>
    {
      state.sideBar.opened = !state.sideBar.opened;
      if (state.sideBar.opened)
      {
        state.sideBar.bottomValue = 0;
      }
      else
      {
        state.sideBar.bottomValue = bottomHideValue;
      }
    },
    TOGGLE_MODAL_BG_SHOW: (state, data) =>
    {
      state.modalBgShow = data;
    },
    SETBUSINESSID: (state, data) =>
    {
      state.businessId = data;
    },
    SETREFRESHTODOTASK: (state, data) =>
    {
      state.refreshTodoTask = data;
    },
    SETISADDTODOTASK: (state, data) =>
    {
      state.isAddTodoTask = data;
    },
    SET_HEIGHT: (state, data) =>
    {
      state.tableHeight = data.tableHeight + 'px';
      state.sideBarHeight = data.sideBarHeight + 'px';
      state.mainContentHeight = data.mainContentHeight + 'px';
      state.treeHeight = data.treeHeight + 'px';
    },
    SET_BULLETIN: (state, data) =>
    {
      state.bulletin = data;
    }
  },

  actions: {
    // 设置出现/隐藏底部导航栏
    toggleSideBar ({commit})
    {
      commit('TOGGLE_SIDEBAR');
    },
    // 设置有无模态框背景色
    toggleModalBgShow ({ commit }, data)
    {
      commit('TOGGLE_MODAL_BG_SHOW', data);
    },
    setBusinessId ({ commit }, data)
    {
      commit('SETBUSINESSID', data);
    },
    setRefreshTodoTask ({ commit }, data)
    {
      commit('SETREFRESHTODOTASK', data);
    },
    setIsAddTodoTask ({ commit }, data)
    {
      commit('SETISADDTODOTASK', data);
    },
    setHeight ({ commit }, data)
    {
      commit('SET_HEIGHT', data);
    },
    setBulletin ({ commit }, data)
    {
      commit('SET_BULLETIN', data);
    }
  }
};

export default app;
