/**
 * 快捷方式的vuex
 */
import { addShortcut } from '@/api/mainFrame/sideBar';
const ERR_OK = 200;

const shortcut = {
  state: {
    shortcut: {}
  },

  mutations: {
    // 添加快捷方式
    ADD_SHORTCUT: (state, data) =>
    {
      state.shortcut = data;
    }
  },

  actions: {
    // 添加快捷方式
    async addShortcut ({ commit }, data)
    {
      try
      {
        let carteId = data;
        const res = await addShortcut(carteId);
        if (res.data.code === ERR_OK && typeof res.data.data !== 'string')
        {
          let carte = Object.assign({}, {
            id: res.data.data.id,
            name: res.data.data.name,
            path: res.data.data.url,
            iconUrl: res.data.data.imgName
          });
          commit('ADD_SHORTCUT', carte);
        }
        else
        {
        }
        return await (res);
      }
      catch (err)
      {
        console.log(err);
      }
    }
  }
};

export default shortcut;
