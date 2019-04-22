import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.projectmanagement.getTree();
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
      let {data} = await api.projectmanagement.listJson(obj);
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
      let {data} = await api.projectmanagement.add(obj);
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
      let {data} = await api.projectmanagement.edit(obj);
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
      let {data} = await api.projectmanagement.show(obj);
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
      let {data} = await api.projectmanagement.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.projectmanagement.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  },
  async extension ({commit}, obj)
  {
    commit(type.EXTENSION, obj);
  },
  async getRightTree ({commit}, projectManagementId)
  {
    try
    {
      let {data} = await api.projectmanagement.getRightTree(projectManagementId);
      commit(type.GET_RIGHTTREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  }
};

export default actions;
