import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.icon.getTree();
      return data.data.ztreeList;
    }
    catch (err)
    {
    }
  },
  showList ({commit}, iconCode)
  {
    commit(type.SHOW_LIST, iconCode);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    try
    {
      let {data} = await api.icon.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {
    }
  },
  async generateIcons ({commit}, obj)
  {
    try
    {
      let restResult = await api.icon.generateIcons(obj);
      return restResult;
    }
    catch (e)
    {
    }
  }
};

export default actions;
