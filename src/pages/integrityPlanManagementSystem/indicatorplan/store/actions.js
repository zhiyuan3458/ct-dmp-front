import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.indicatorplan.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, lawType)
  {
    commit(type.SHOW_LIST, lawType);
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.indicatorplan.listJson(obj);
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
      let {data} = await api.indicatorplan.add(obj);
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
      let {data} = await api.indicatorplan.edit(obj);
      commit(type.EDIT, data.data);
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
      let {data} = await api.indicatorplan.save(obj);
      commit(type.RETURN, data);
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
      let {data} = await api.indicatorplan.remove(obj);
      commit(type.RETURN, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async submit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.indicatorplan.submit(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  setIsLoading ({commit}, obj)
  {
    commit(type.IS_LOADING, obj);
  }
};

export default actions;
