import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getRoleTree ({commit})
  {
    try
    {
      let {data} = await api.role.getTree();
      commit(type.GET_ROLE_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async getTree ({commit}, obj)
  {
    try
    {
      let {data} = await api.apppermission.getTree(obj);
      commit(type.GET_TREE, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.apppermission.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
