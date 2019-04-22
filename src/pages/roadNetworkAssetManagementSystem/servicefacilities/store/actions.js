import api from '@/api/roadNetworkAssetManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.servicefacilities.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, belongDeptId)
  {
    commit(type.SHOW_LIST, belongDeptId);
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.servicefacilities.listJson(obj);
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
      let response = await api.servicefacilities.add(obj);
      response.data.data.qrCodeUrl = `${response.config.url}?id=${response.data.data.entity.id}`;
      commit(type.ADD, response.data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let response = await api.servicefacilities.edit(obj);
      response.data.data.qrCodeUrl = `${response.config.url}?id=${response.data.data.entity.id}`;
      commit(type.EDIT, response.data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let response = await api.servicefacilities.show(obj);
      response.data.data.qrCodeUrl = `${response.config.url}?id=${response.data.data.entity.id}`;
      commit(type.SHOW, response.data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.servicefacilities.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.servicefacilities.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
