import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.minormaintenance.getTree();
      return data;
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
      let {data} = await api.minormaintenance.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  },
  async add ({commit})
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.minormaintenance.add();
      data.data.subList = data.data.subList !== undefined ? JSON.stringify(data.data.subList) : '';
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
      let {data} = await api.minormaintenance.save(obj);
      commit(type.RETURN, data);
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
      let {data} = await api.minormaintenance.edit(obj);
      data.data.subList = data.data.subList !== undefined ? JSON.stringify(data.data.subList) : '';
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
      let {data} = await api.minormaintenance.show(obj);
      data.data.subList = data.data.subList !== undefined ? JSON.stringify(data.data.subList) : '';
      commit(type.SHOW, data.data);
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
      let {data} = await api.minormaintenance.remove(obj);
      commit(type.RETURN, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
