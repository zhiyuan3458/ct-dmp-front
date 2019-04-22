import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';

const actions = {
  async getTree ({commit})
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cementroaddamage.getTree();
      commit(type.IS_LOADING, false);
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, deptId)
  {
    try
    {
      commit(type.SHOW_LIST, deptId);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cementroaddamage.listJson(obj);
      commit(type.IS_LOADING, false);
      commit(type.LISTJSON, data);
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
      let {data} = await api.cementroaddamage.add({});
      commit(type.IS_LOADING, false);
      commit(type.IS_LOADING, false);
      commit(type.ADD, data.data);
    }
    catch (e)
    {
      console.log(e);
    }
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cementroaddamage.edit(obj);
      commit(type.IS_LOADING, false);
      data.data.listCementRoadDamageSub = data.data.listCementRoadDamageSub !== undefined ? JSON.stringify(data.data.listCementRoadDamageSub) : '';
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.cementroaddamage.show(obj);
      commit(type.IS_LOADING, false);
      data.data.listCementRoadDamageSub = data.data.listCementRoadDamageSub !== undefined ? JSON.stringify(data.data.listCementRoadDamageSub) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.cementroaddamage.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, restResult.data.data);
      return restResult;
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.cementroaddamage.remove(obj);
      commit(type.IS_LOADING, false);
      commit(type.REMOVE, restResult.data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
