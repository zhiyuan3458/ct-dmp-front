import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    let {data} = await api.processInstance.getTree();
    return data.data;
  },
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async show ({commit}, obj)
  {
    let {data} = await api.processInstance.show(obj);
    commit(type.SHOW, data.data);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processInstance.listJson(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async remove ({commit}, obj)
  {
    let { data } = await api.processInstance.remove(obj);
    return data;
  },
  return ({commit}, obj)
  {
    commit(type.RETURN, obj);
  }

};

export default actions;
