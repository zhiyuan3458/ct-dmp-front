import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    let {data} = await api.processDefinition.getTree();
    return data.data;
  },
  async addCategory ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.addCategory(obj);
    commit(type.ADDCATEGORY, data.data);
    commit(type.IS_LOADING, false);
    return data.data;
  },
  async saveCategory ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.saveCategory(obj);
    commit(type.SAVECATEGORY, data.data);
    commit(type.IS_LOADING, false);
    return data.data;
  },
  async removeCategory ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.removeCategory(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  showList ({commit}, data)
  {
    commit(type.SHOW_LIST, data);
  },
  async add ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.add(obj);
    let param = { value: 'processdefinition', pageNum: 1, pageSize: 20 };
    let result = await api.dictionary.listJson(param);
    data.data.processCategoryList = result.data.data.tableList;
    commit(type.ADD, data.data);
    commit(type.IS_LOADING, false);
  },
  async edit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.edit(obj);
    let param = { value: 'processdefinition', pageNum: 1, pageSize: 20 };
    let result = await api.dictionary.listJson(param);
    data.data.processCategoryList = result.data.data.tableList;
    commit(type.EDIT, data.data);
    commit(type.IS_LOADING, false);
  },
  async listJson ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.listJson(obj);
    commit(type.LISTJSON, data);
    commit(type.IS_LOADING, false);
  },
  async save ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.processDefinition.save(obj);
    commit(type.RETURNfN, data.data);
    commit(type.IS_LOADING, false);
  },
  async remove ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.processDefinition.remove(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async show ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.processDefinition.show(obj);
    commit(type.SHOW, data.data);
    commit(type.IS_LOADING, false);
  },
  async deploy ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let { data } = await api.processDefinition.deploy(obj);
    commit(type.IS_LOADING, false);
    return data;
  },
  async returnFn ({commit}, obj)
  {
    commit(type.RETURNfN, obj);
  }
};

export default actions;
