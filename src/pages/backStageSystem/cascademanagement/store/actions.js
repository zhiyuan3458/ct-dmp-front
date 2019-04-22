import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.getTree();
      commit(type.IS_LOADING, false);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit})
  {
    try
    {
      commit(type.SHOW_LIST);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.listJson(obj);
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
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.add(obj);
      let result = await api.cascademanagement.getBtns(obj);
      data.data.treeBtns = result.data.data.operateBtns;
      commit(type.ADD, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.show(obj);
      commit(type.SHOW, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.edit(obj);
      commit(type.IS_LOADING, false);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cascademanagement.save(obj);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let { data } = await api.cascademanagement.remove(obj);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
