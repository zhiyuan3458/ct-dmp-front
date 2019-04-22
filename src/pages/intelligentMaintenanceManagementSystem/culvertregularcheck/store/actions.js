import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.culvertregularcheck.getTree();
      commit(type.IS_LOADING, false);
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
      let {data} = await api.culvertregularcheck.listJson(obj);
      commit(type.IS_LOADING, false);
      commit(type.LISTJSON, data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.culvertregularcheck.add(obj);
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
      let {data} = await api.culvertregularcheck.edit(obj);
      commit(type.IS_LOADING, false);
      data.data.listCulvertRegularRecord = data.data.listCulvertRegularRecord !== undefined ? JSON.stringify(data.data.listCulvertRegularRecord) : '';
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
      let {data} = await api.culvertregularcheck.show(obj);
      commit(type.IS_LOADING, false);
      data.data.listCulvertRegularRecord = data.data.listCulvertRegularRecord !== undefined ? JSON.stringify(data.data.listCulvertRegularRecord) : '';
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
      let {data} = await api.culvertregularcheck.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.culvertregularcheck.remove(obj);
      commit(type.IS_LOADING, false);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
