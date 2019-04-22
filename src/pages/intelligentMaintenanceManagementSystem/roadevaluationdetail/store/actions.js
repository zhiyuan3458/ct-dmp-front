import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.roadevaluationdetail.getTree();
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, obj)
  {
    try
    {
      commit(type.SHOW_LIST, obj);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.roadevaluationdetail.listJson(obj);
      commit(type.LISTJSON, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
