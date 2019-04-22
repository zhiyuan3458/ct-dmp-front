import api from '@/api/roadNetworkAssetManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.bridge.getTree();
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
      let {data} = await api.bridge.listJson(obj);
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
      commit(type.IS_LOADING, true);
      let {data} = await api.bridge.add(obj);
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
      let response = await api.bridge.edit(obj);
      response.data.data.listBridgeTech = response.data.data.listBridgeTech !== undefined ? JSON.stringify(response.data.data.listBridgeTech) : '';
      response.data.data.listBridgeRecord = response.data.data.listBridgeRecord !== undefined ? JSON.stringify(response.data.data.listBridgeRecord) : '';
      response.data.data.listBridgeSubStructure = response.data.data.listBridgeSubStructure !== undefined ? JSON.stringify(response.data.data.listBridgeSubStructure) : '';
      response.data.data.listBridgeSupStructure = response.data.data.listBridgeSupStructure !== undefined ? JSON.stringify(response.data.data.listBridgeSupStructure) : '';
      response.data.data.qrCodeData = JSON.stringify({
        redirectTo: obj.route, // android端重定向的路径
        url: `${response.config.url}?id=${response.data.data.entity.id}` // android端获取数据的链接
      });
      commit(type.EDIT, response.data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let response = await api.bridge.show(obj);
      response.data.data.listBridgeTech = response.data.data.listBridgeTech !== undefined ? JSON.stringify(response.data.data.listBridgeTech) : '';
      response.data.data.listBridgeRecord = response.data.data.listBridgeRecord !== undefined ? JSON.stringify(response.data.data.listBridgeRecord) : '';
      response.data.data.listBridgeSubStructure = response.data.data.listBridgeSubStructure !== undefined ? JSON.stringify(response.data.data.listBridgeSubStructure) : '';
      response.data.data.listBridgeSupStructure = response.data.data.listBridgeSupStructure !== undefined ? JSON.stringify(response.data.data.listBridgeSupStructure) : '';
      response.data.data.qrCodeData = JSON.stringify({
        redirectTo: obj.route, // android端重定向的路径
        url: `${response.config.url}?id=${response.data.data.entity.id}` // android端获取数据的链接
      });
      commit(type.SHOW, response.data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridge.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.bridge.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
