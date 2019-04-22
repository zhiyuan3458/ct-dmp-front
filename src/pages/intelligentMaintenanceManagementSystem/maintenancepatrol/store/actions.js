import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.maintenancepatrol.getTree();
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
      let {data} = await api.maintenancepatrol.listJson(obj);
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
      let {data} = await api.maintenancepatrol.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.maintenancepatrol.edit(obj);
      data.data.listMaintenancePatrolSub = data.data.listMaintenancePatrolSub !== undefined ? JSON.stringify(data.data.listMaintenancePatrolSub) : '';
      data.data.listMaintenanceRoadCases = data.data.listMaintenanceRoadCases !== undefined ? JSON.stringify(data.data.listMaintenanceRoadCases) : '';
      data.data.listMaintenanceEvents = data.data.listMaintenanceEvents !== undefined ? JSON.stringify(data.data.listMaintenanceEvents) : '';
      data.data.listMaintenanceSuddenlyEvents = data.data.listMaintenanceSuddenlyEvents !== undefined ? JSON.stringify(data.data.listMaintenanceSuddenlyEvents) : '';
      data.data.listMaintenanceOtherEvents = data.data.listMaintenanceOtherEvents !== undefined ? JSON.stringify(data.data.listMaintenanceOtherEvents) : '';
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let {data} = await api.maintenancepatrol.show(obj);
      data.data.listMaintenancePatrolSub = data.data.listMaintenancePatrolSub !== undefined ? JSON.stringify(data.data.listMaintenancePatrolSub) : '';
      data.data.listMaintenanceRoadCases = data.data.listMaintenanceRoadCases !== undefined ? JSON.stringify(data.data.listMaintenanceRoadCases) : '';
      data.data.listMaintenanceEvents = data.data.listMaintenanceEvents !== undefined ? JSON.stringify(data.data.listMaintenanceEvents) : '';
      data.data.listMaintenanceSuddenlyEvents = data.data.listMaintenanceSuddenlyEvents !== undefined ? JSON.stringify(data.data.listMaintenanceSuddenlyEvents) : '';
      data.data.listMaintenanceOtherEvents = data.data.listMaintenanceOtherEvents !== undefined ? JSON.stringify(data.data.listMaintenanceOtherEvents) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.maintenancepatrol.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.maintenancepatrol.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
