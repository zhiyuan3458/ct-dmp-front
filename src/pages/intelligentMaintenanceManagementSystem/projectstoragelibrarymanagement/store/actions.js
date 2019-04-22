import api from '@/api/intelligentMaintenanceManagementSystem/api';
import type from './mutation-type';

const actions = {
  async showList ({commit}, obj)
  {
    try
    {
      commit(type.SHOW_LIST, obj);
    }
    catch (e)
    {}
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.projectstoragelibrarymanagement.listJson(obj);
      commit(type.IS_LOADING, false);
      commit(type.LISTJSON, data);
    }
    catch (e)
    { }
  },
  async add ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.projectstoragelibrarymanagement.add(obj);
      commit(type.IS_LOADING, false);
      commit(type.ADD, data.data);
    }
    catch (e)
    {
      console.log(e);
    }
  },
  async edit ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.projectstoragelibrarymanagement.edit(obj);
      data.data.listProjectStorageLibraryManagementActualSub = data.data.listProjectStorageLibraryManagementActualSub !== undefined ? JSON.stringify(data.data.listProjectStorageLibraryManagementActualSub) : '';
      data.data.listProjectStorageLibraryManagementPlanSub = data.data.listProjectStorageLibraryManagementPlanSub !== undefined ? JSON.stringify(data.data.listProjectStorageLibraryManagementPlanSub) : '';
      commit(type.IS_LOADING, false);
      commit(type.EDIT, data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.projectstoragelibrarymanagement.show(obj);
      commit(type.IS_LOADING, false);
      data.data.listProjectStorageLibraryManagementActualSub = data.data.listProjectStorageLibraryManagementActualSub !== undefined ? JSON.stringify(data.data.listProjectStorageLibraryManagementActualSub) : '';
      data.data.listProjectStorageLibraryManagementPlanSub = data.data.listProjectStorageLibraryManagementPlanSub !== undefined ? JSON.stringify(data.data.listProjectStorageLibraryManagementPlanSub) : '';
      commit(type.SHOW, data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.projectstoragelibrarymanagement.save(obj);
      commit(type.IS_LOADING, false);
      commit(type.SAVE, restResult.data.data);
      return restResult;
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let restResult = await api.projectstoragelibrarymanagement.remove(obj);
      commit(type.IS_LOADING, false);
      commit(type.REMOVE, restResult.data.data);
    }
    catch (e)
    {}
  }
};

export default actions;
