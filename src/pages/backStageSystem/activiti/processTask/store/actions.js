import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    let {data} = await api.processTask.getTree();
    commit(type.GET_TREE, data.data);
    return data.data;
  },
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async show ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.show(obj);
    commit(type.SHOW, data.data);
    commit(type.IS_LOADING, false);
  },
  async transfer ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.transfer(obj);
    let userTree = await api.user.getTree();
    data.data.userTree = userTree.data.data.ztreeList;
    commit(type.TRANSFER, data.data);
    commit(type.IS_LOADING, false);
  },
  async retrieve ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.retrieve(obj);
    commit(type.RETURN, data);
    commit(type.IS_LOADING, false);
    return data;
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.listJson(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async save ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processTask.save(obj);
    commit(type.RETURN, data.data);
    commit(type.IS_LOADING, false);
  },
  return ({commit}, obj)
  {
    commit(type.RETURN, obj);
  }

};

export default actions;
