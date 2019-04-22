import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit}, obj)
  {
    let {data} = await api.bulletin.getTree(obj);
    return data.data;
  },
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async transfer ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    // 获取转办页面按钮
    let {data} = await api.todoTask.transfer(obj);
    // 获取用户树
    let userTree = await api.user.getUserTree();
    data.data.userTree = userTree.data.data.ztreeList;
    commit(type.TRANSFER, data.data);
    commit(type.IS_LOADING, false);
  },
  async submit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.todoTask.save(obj);
    commit(type.RETURN, data);
    commit(type.IS_LOADING, false);
    return data;
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.bulletin.todoList(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async audit ({commit}, obj)
  {
    let { data } = await api.todoTask.getRouter(obj);
    return data.data;
  },
  async return ({commit}, obj)
  {
    commit(type.RETURN, obj);
  }
};

export default actions;
