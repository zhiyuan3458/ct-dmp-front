import api from '@/api/backStageSystem/api';
import type from '@/pages/backStageSystem/notice/store/mutation-type';

const actions = {
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.bulletin.noticeList(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async add ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.bulletin.add(obj);
    let result = await api.user.getUserTree();
    data.data.userTree = result.data.data.ztreeList;
    commit(type.ADD, data.data);
    commit(type.IS_LOADING, false);
    return data.data;
  },
  async edit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.bulletin.edit(obj);
    let result = await api.user.getUserTree({ userIds: data.data.entity.reader });
    data.data.userTree = result.data.data.ztreeList;
    commit(type.EDIT, data.data);
    commit(type.IS_LOADING, false);
  },
  async save ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.bulletin.save(obj);
    commit(type.RETURN, obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async remove ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.bulletin.remove(obj);
    commit(type.RETURN, obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async show ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.bulletin.show(obj);
    let result = await api.user.getUserTree({ userIds: data.data.entity.reader });
    data.data.userTree = result.data.data.ztreeList;
    commit(type.SHOW, data.data);
    commit(type.IS_LOADING, false);
  }
};
export default actions;
