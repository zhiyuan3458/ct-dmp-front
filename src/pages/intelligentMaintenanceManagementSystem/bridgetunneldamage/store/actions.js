import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.bridgetunneldamage.getTree();
      return data.data;
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridgetunneldamage.listJson(obj);
      return data;
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.bridgetunneldamage.show(obj);
      data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      commit(type.SHOW, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
