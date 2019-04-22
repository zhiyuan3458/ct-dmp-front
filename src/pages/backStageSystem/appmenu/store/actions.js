import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.appmenu.getTree();
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
      let {data} = await api.appmenu.edit(obj);
      data.data.entity.createPagesMenu = '';
      data.data.entity.operateBtns = data.data.entity.operateBtns !== undefined ? data.data.entity.operateBtns : '';
      data.data.entity.tableBtns = data.data.entity.tableBtns !== undefined ? data.data.entity.tableBtns : '';
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.appmenu.add(obj);
      data.data.entity.createPagesMenu = '';
      data.data.entity.operateBtns = data.data.entity.operateBtns !== undefined ? data.data.entity.operateBtns : '';
      data.data.entity.tableBtns = data.data.entity.tableBtns !== undefined ? data.data.entity.tableBtns : '';
      commit(type.ADD, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let restResult = await api.appmenu.save(obj);
      restResult.data.data.entity.createPagesMenu = '';
      restResult.data.data.entity.operateBtns = restResult.data.data.entity.operateBtns !== null ? restResult.data.data.entity.operateBtns : '';
      restResult.data.data.entity.tableBtns = restResult.data.data.entity.tableBtns !== null ? restResult.data.data.entity.tableBtns : '';
      commit(type.SAVE, restResult.data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let restResult = await api.appmenu.remove(obj);
      commit(type.REMOVE, restResult.data);
      return restResult.data;
    }
    catch (e)
    {}
  }
};

export default actions;
