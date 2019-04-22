/**
 * 快捷方式的vuex
 */
import { getEcharts } from '@/api/common/common';

const deskSetting = {
  state: {
    initEcharts: [],
    innerDialogVisible: false
  },

  mutations: {
    // 获取首页自定义顺序的图表
    GET_DESK_SETTING: (state, data) =>
    {
      state.initEcharts = data;
    }
  },

  actions: {
    // 获取首页自定义顺序的图表
    async getDeskSetting ({ commit }, systemId)
    {
      try
      {
        const { data } = await getEcharts(systemId);
        commit('GET_DESK_SETTING', data.data.object);
      }
      catch (err)
      {
        console.log(err);
      }
    }
  }
};

export default deskSetting;
