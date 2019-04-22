import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.modulemanage.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.modulemanage.edit(obj);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async editDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.modulemanage.editDetail(obj);
      commit(type.EDIT_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let restResult = await api.modulemanage.save(obj);
      commit(type.SAVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async saveDetail ({commit}, obj)
  {
    try
    {
      let restResult = await api.modulemanage.saveDetail(obj);
      commit(type.SAVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.modulemanage.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.modulemanage.remove(obj);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
