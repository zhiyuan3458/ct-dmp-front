import api from '@/api/roadNetworkAssetManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.safetyFacilities.getTree();
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
      let {data} = await api.safetyFacilities.listJson(obj);
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
      let {data} = await api.safetyFacilities.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let response = await api.safetyFacilities.edit(obj);
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
      let response = await api.safetyFacilities.show(obj);
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
      let {data} = await api.safetyFacilities.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.safetyFacilities.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
