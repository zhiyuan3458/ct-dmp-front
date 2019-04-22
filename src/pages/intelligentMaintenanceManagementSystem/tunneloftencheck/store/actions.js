import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';

const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.tunneloftencheck.getTree();
      commit(type.GET_TREE, data.data);
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
      let {data} = await api.tunneloftencheck.listJson(obj);
      commit(type.IS_LOADING, false);
      commit(type.LISTJSON, data);
    }
    catch (e)
    { }
  },
  async add ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.tunneloftencheck.add(obj);
      commit(type.IS_LOADING, false);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.tunneloftencheck.edit(obj);
      commit(type.IS_LOADING, false);
      data.data.listTunnelOftenRecord = data.data.listTunnelOftenRecord !== undefined ? JSON.stringify(data.data.listTunnelOftenRecord) : '';
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
      let {data} = await api.tunneloftencheck.show(obj);
      commit(type.IS_LOADING, false);
      data.data.listTunnelOftenRecord = data.data.listTunnelOftenRecord !== undefined ? JSON.stringify(data.data.listTunnelOftenRecord) : '';
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
      let restResult = await api.tunneloftencheck.save(obj);
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
      let restResult = await api.tunneloftencheck.remove(obj);
      commit(type.IS_LOADING, false);
      commit(type.REMOVE, restResult.data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
