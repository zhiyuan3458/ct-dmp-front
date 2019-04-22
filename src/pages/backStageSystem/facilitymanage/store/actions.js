import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.facilitymanage.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.facilitymanage.edit(obj);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let restResult = await api.facilitymanage.save(obj);
      commit(type.SAVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.facilitymanage.add(obj);
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.facilitymanage.remove(obj);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
