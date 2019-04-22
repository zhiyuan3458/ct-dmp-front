import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.carpurchasetaxmanagement.getTree();
      return data.data;
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetaxmanagement.edit(obj);
      commit(type.EDIT, data.data);
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
      let {data} = await api.carpurchasetaxmanagement.add(obj);
      commit(type.ADD, data.data);
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
      let {data} = await api.carpurchasetaxmanagement.save(obj);
      commit(type.SAVE, data.data);
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
      let {data} = await api.carpurchasetaxmanagement.remove(obj);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
