import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async add ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.leave.add(obj);
    commit(type.ADD, data.data);
    commit(type.IS_LOADING, false);
    return data.data;
  },
  async edit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.leave.edit(obj);
    commit(type.EDIT, data.data);
    commit(type.IS_LOADING, false);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.leave.listJson(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async save ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.leave.save(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async submit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.leave.submit(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async remove ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.leave.remove(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async show ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.leave.show(obj);
    commit(type.SHOW, data.data);
    commit(type.IS_LOADING, false);
  },
  return ({commit}, obj)
  {
    commit(type.IS_LOADING, false);
    commit(type.RETURN, obj);
  },
  setIsLoading ({commit}, obj)
  {
    commit(type.IS_LOADING, obj);
  }
};

export default actions;
