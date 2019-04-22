import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.desk.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, systemId)
  {
    try
    {
      commit(type.SHOW_LIST, systemId);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.desk.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.desk.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.desk.edit(obj);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let restResult = await api.desk.save(obj);
      commit(type.SAVE, restResult.data.data);
      return restResult;
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let restResult = await api.desk.remove(obj);
      commit(type.REMOVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async changePosition ({ commit }, obj)
  {
    try
    {
      let restResult = await api.desk.changePosition(obj);
      console.log(restResult);
    }
    catch (e)
    {}
  }
};

export default actions;
