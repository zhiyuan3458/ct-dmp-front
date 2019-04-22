import api from '@/api/integrityPlanManagementSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.carpurchasetax.getTree();
      return data;
    }
    catch (e)
    {}
  },
  showList ({commit}, obj)
  {
    commit(type.SHOW_LIST, obj);
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.add(obj);
      data.data.investmentStatusSub = data.data.investmentStatusSub !== undefined ? JSON.stringify(data.data.investmentStatusSub) : '';
      commit(type.ADD, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.save(obj);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.edit(obj);
      data.data.investmentStatusSub = data.data.investmentStatusSub !== undefined ? JSON.stringify(data.data.investmentStatusSub) : '';
      data.data.suggestedPlanSub = data.data.suggestedPlanSub !== undefined ? JSON.stringify(data.data.suggestedPlanSub) : '';
      commit(type.EDIT, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.show(obj);
      data.data.investmentStatusSub = data.data.investmentStatusSub !== undefined ? JSON.stringify(data.data.investmentStatusSub) : '';
      data.data.suggestedPlanSub = data.data.suggestedPlanSub !== undefined ? JSON.stringify(data.data.suggestedPlanSub) : '';
      commit(type.SHOW, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.carpurchasetax.remove(obj);
      commit(type.IS_LOADING, false);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
