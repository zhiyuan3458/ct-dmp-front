import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.scoretable.getTree();
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
      let {data} = await api.scoretable.listJson(obj);
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
      console.log('add:');
      console.log(obj);
      let {data} = await api.scoretable.add(obj);
      // data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.scoretable.edit(obj);
      // data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
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
      let {data} = await api.scoretable.show(obj);
      // data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
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
      let {data} = await api.scoretable.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.scoretable.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  },
  async extension ({commit}, obj)
  {
    commit(type.EXTENSION, obj);
  },
  async getRightTree ({commit}, scoreTableId)
  {
    try
    {
      let {data} = await api.scoretable.getRightTree(scoreTableId);
      commit(type.GET_RIGHTTREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async editDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.scoretable.editDetail(obj);
      // data.data.list = data.data.list !== undefined ? JSON.stringify(data.data.list) : '';
      // data.data.listTunnelRecord = data.data.listTunnelRecord !== undefined ? JSON.stringify(data.data.listTunnelRecord) : '';
      commit(type.EDIT_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async saveDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.scoretable.saveDetail(obj);
      commit(type.SAVE_DETAIL, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
