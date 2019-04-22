import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.role.getTree({});
      return data.data;
    }
    catch (e)
    {}
  },
  async edit ({commit}, id)
  {
    try
    {
      let {data} = await api.role.edit({id});
      let userTree = await api.user.getTree({roleId: id});
      commit(type.GET_USERTREE, userTree.data.data.ztreeList);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.role.add(obj);
      let userTree = await api.user.getTree();
      commit(type.GET_USERTREE, userTree.data.data.ztreeList);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.role.remove(obj);
      return data;
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.role.save(obj);
      commit(type.SAVE, restResult);
      let {data} = await api.role.getTree({});
      commit(type.GET_TREE, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
