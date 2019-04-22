import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit}, obj)
  {
    try
    {
      let {data} = await api.indicator.getTree(obj);
      data.data.urlType = obj.urlType;
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.indicator.listJson(obj);
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
      let {data} = await api.indicator.add(obj);
      data.data.parentId = obj.parentId;
      commit(type.ADD, data.data);
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
      let {data} = await api.indicator.edit(obj);
      data.data.isDetailEdit = false;
      commit(type.EDIT, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async detail ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.indicator.detail(obj);
      data.data.isDetailEdit = true;
      data.data.urlType = obj.urlType;
      commit(type.EDIT, data.data);
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
      let {data} = await api.indicator.show(obj);
      commit(type.SHOW, data.data);
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
      let {data} = await api.indicator.save(obj);
      if (obj.isDetailEdit === false)
      {
        commit(type.RETURN, data);
      }
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.indicator.remove(obj);
      commit(type.RETURN, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  return ({commit})
  {
    commit(type.RETURN);
  },
  destroyed ({commit})
  {
    commit(type.DESTROYED);
    return true;
  }
};

export default actions;
