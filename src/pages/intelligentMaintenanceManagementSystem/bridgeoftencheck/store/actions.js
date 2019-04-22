import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.bridgeoftencheck.getTree();
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
      let {data} = await api.bridgeoftencheck.listJson(obj);
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
      let {data} = await api.bridgeoftencheck.add(obj);
      data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridgeoftencheck.edit(obj);
      data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      // data.data.listTunnelRecord = data.data.listTunnelRecord !== undefined ? JSON.stringify(data.data.listTunnelRecord) : '';
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridgeoftencheck.show(obj);
      data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      // data.data.listTunnelRecord = data.data.listTunnelRecord !== undefined ? JSON.stringify(data.data.listTunnelRecord) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridgeoftencheck.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridgeoftencheck.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
