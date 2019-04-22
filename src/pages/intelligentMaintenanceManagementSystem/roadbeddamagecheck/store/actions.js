import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.roadbeddamagecheck.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, deptId)
  {
    commit(type.SHOW_LIST, deptId);
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      console.log(obj);
      let {data} = await api.roadbeddamagecheck.listJson(obj);
      commit(type.IS_LOADING, false);
      commit(type.LISTJSON, data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.roadbeddamagecheck.show(obj);
      commit(type.IS_LOADING, false);
      data.data.listRoadbedSubDamageCheck = data.data.listRoadbedSubDamageCheck !== undefined ? JSON.stringify(data.data.listRoadbedSubDamageCheck) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  }

};

export default actions;
