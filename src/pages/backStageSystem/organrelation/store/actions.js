import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getOrganrelationTree ({commit}, obj)
  {
    try
    {
      let {data} = await api.organrelation.getOrganrelationTree(obj);
      commit(type.GET_ORGANRELATION_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.organrelation.getTree();
      return data.data;
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.organrelation.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
