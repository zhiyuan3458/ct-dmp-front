import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.station.edit(obj);
      commit(type.EDIT, data.data);
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
      obj.attachmentVO = {};
      obj.chrome = {};
      let {data} = await api.station.save(obj);
      commit(type.SAVE, data.data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  }
};

export default actions;
