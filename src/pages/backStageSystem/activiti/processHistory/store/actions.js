import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    let {data} = await api.processHistory.getTree();
    commit(type.GET_TREE, data.data);
    return data.data;
  },
  async showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async show ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.showList(obj);
    data.processInstanceId = obj.processInstanceId;
    commit(type.SHOW, data);
    commit(type.IS_LOADING, false);
  },
  async showDetail ({commit}, obj)
  {
    let {data} = await api.processTask.show(obj);
    commit(type.SHOWDETAIL, data.data);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processHistory.listJson(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async remove ({commit}, obj)
  {
    let {data} = await api.processHistory.remove(obj);
    return data;
  },
  return ({commit}, obj)
  {
    commit(type.RETURN, obj);
  }

};

export default actions;
