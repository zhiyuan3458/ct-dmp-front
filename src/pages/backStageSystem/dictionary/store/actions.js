import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.dictionary.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let {data} = await api.dictionary.show(obj);
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.dictionary.edit(obj);
      commit(type.IS_LOADING, false);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.dictionary.add(obj);
      commit(type.IS_LOADING, false);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.dictionary.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.dictionary.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let { data } = await api.dictionary.remove(obj);
      return data;
    }
    catch (e)
    {}
  },
  showList ({commit}, dictionaryCode)
  {
    try
    {
      commit(type.SHOW_LIST, dictionaryCode);
    }
    catch (e)
    {}
  }
};

export default actions;
