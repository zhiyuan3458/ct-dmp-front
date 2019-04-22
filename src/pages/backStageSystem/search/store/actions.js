import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async showList ({commit}, treeNode)
  {
    try
    {
      let {data} = await api.search.getAllIndex();
      commit(type.SHOW_LIST, data.data);
    }
    catch (e)
    {}
  },
  async addEdit ({commit}, obj)
  {
    try
    {
      let {data} = await api.search.addEdit(obj);
      commit(type.ADDEDIT, data.data);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.search.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async saveOrUpdate ({commit}, obj)
  {
    try
    {
      let {data} = await api.search.saveOrUpdate(obj);
      commit(type.SAVE_OR_UPDATE, data);
    }
    catch (e)
    {}
  },
  async returnFn ({commit}, obj)
  {
    try
    {
      commit(type.RETURNfN, obj);
    }
    catch (e)
    {}
  },
  async searchTypeByIndex ({commit}, obj)
  {
    try
    {
      let {data} = await api.search.searchTypeByIndex(obj);
      commit(type.SEARCHTYPEBYINDEX, data.data);
    }
    catch (e)
    {}
  },
  async searchData ({commit}, obj)
  {
    try
    {
      console.log('searchData');
      let {data} = await api.search.searchData(obj);
      commit(type.SEARCHDATA, data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.search.remove(obj);
      commit(type.SEARCHDATA, data);
    }
    catch (e)
    {}
  }
};

export default actions;
