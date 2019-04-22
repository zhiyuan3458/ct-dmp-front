import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.roadmaintenanceprojectplan.getTree();
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
      let {data} = await api.roadmaintenanceprojectplan.listJson(obj);
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
      let {data} = await api.roadmaintenanceprojectplan.add();
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
      let {data} = await api.roadmaintenanceprojectplan.save(obj);
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
      let {data} = await api.roadmaintenanceprojectplan.edit(obj);
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
      let {data} = await api.roadmaintenanceprojectplan.show(obj);
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
      let {data} = await api.roadmaintenanceprojectplan.remove(obj);
      commit(type.RETURN, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
