import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      console.log('1233123123');
      let {data} = await api.tcidamage.getTree();

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
      let {data} = await api.tcidamage.listJson(obj);
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
      let {data} = await api.tcidamage.add(obj);
      data.data.listRecord = data.data.listRecord !== undefined ? JSON.stringify(data.data.listRecord) : '';
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.tcidamage.edit(obj);
      data.data.listRecord = data.data.listRecord !== undefined ? JSON.stringify(data.data.listRecord) : '';
      // data.data.listRecordTunnelRecord = data.data.listRecordTunnelRecord !== undefined ? JSON.stringify(data.data.listRecordTunnelRecord) : '';
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let {data} = await api.tcidamage.show(obj);
      data.data.listRecord = data.data.listRecord !== undefined ? JSON.stringify(data.data.listRecord) : '';
      // data.data.listRecordTunnelRecord = data.data.listRecordTunnelRecord !== undefined ? JSON.stringify(data.data.listRecordTunnelRecord) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.tcidamage.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.tcidamage.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
