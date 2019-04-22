import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.weatherforecast.getTree();
      commit(type.IS_LOADING, false);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, data)
  {
    try
    {
      commit(type.SHOW_LIST, data);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.weatherforecast.currentList(obj);
      commit(type.CURRENTLISTJSON, data);

      let history = await api.weatherforecast.historyList(obj);
      commit(type.HISTORYLISTJSON, history.data);

      let result = await api.weatherforecast.futureList(obj);
      commit(type.FUTURELISTJSON, result.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async currentShow ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.weatherforecast.currentShow(obj);
      commit(type.SHOW, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async futureShow ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.weatherforecast.futureShow(obj);
      commit(type.SHOW, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async currentListJson ({commit}, obj)
  {
    try
    {
      let {data} = await api.weatherforecast.currentList(obj);
      commit(type.CURRENTLISTJSON, data);
      return data;
    }
    catch (e)
    {}
  },
  async historyListJson ({commit}, obj)
  {
    try
    {
      let {data} = await api.weatherforecast.historyList(obj);
      commit(type.HISTORYLISTJSON, data);
      return data;
    }
    catch (e)
    {}
  },
  async futureListJson ({commit}, obj)
  {
    try
    {
      let {data} = await api.weatherforecast.futureList(obj);
      commit(type.FUTURELISTJSON, data);
      return data;
    }
    catch (e)
    {}
  }
};

export default actions;
