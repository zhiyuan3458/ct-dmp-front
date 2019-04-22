import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.relatedtable.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async saveDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.saveDetail(obj);
      commit(type.SAVE_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async addDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.addDetail(obj);
      commit(type.ADD_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async showDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.showDetail(obj);
      commit(type.SHOW_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.edit(obj);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async editDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.editDetail(obj);
      commit(type.EDIT_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  },
  async removeDetail ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.removeDetail(obj);
      commit(type.REMOVE_DETAIL, data.data);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      let {data} = await api.relatedtable.list(obj);
      commit(type.LIST, data);
    }
    catch (e)
    {}
  },
  async showList ({commit}, obj)
  {
    try
    {
      commit(type.SHOW_LIST, obj);
    }
    catch (e)
    {}
  }
};

export default actions;
