import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit})
  {
    try
    {
      let {data} = await api.dept.getTree();
      commit(type.GET_TREE, data.data);
      return data.data;
    }
    catch (e)
    {}
  },
  showList ({commit}, deptId)
  {
    commit(type.SHOW_LIST, deptId);
  },
  async resetPwd ({commit}, obj)
  {
    let {data} = await api.user.resetPwd(obj);
    return data.data;
  },
  async listJson ({commit}, obj)
  {
    try
    {
      commit(type.IS_LOADING, true);
      let {data} = await api.user.listJson(obj);
      commit(type.LISTJSON, data);
      commit(type.IS_LOADING, false);
    }
    catch (e)
    {}
  },
  async add ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.add(obj);
      let roleTree = await api.role.getTree(obj);
      let deptTree = await api.dept.getTree(obj);
      commit(type.ADD, data.data);
      commit(type.GET_ROLETREE, roleTree.data.data);
      commit(type.GET_DEPTTREE, deptTree.data.data);
    }
    catch (e)
    {}
  },
  async edit ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.edit(obj);
      let roleTree = await api.role.getTree(obj);
      let deptTree = await api.dept.getTree(obj);
      let avator = await api.user.getAvator(obj);
      data.data.entity = Object.assign({}, data.data.entity, {avator: avator.data.data !== '' ? `data:image/jpg;base64,${avator.data.data}` : ''});
      commit(type.EDIT, data.data);
      commit(type.GET_ROLETREE, roleTree.data.data);
      commit(type.GET_DEPTTREE, deptTree.data.data);
    }
    catch (e)
    {}
  },
  async show ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.show(obj);
      let roleTree = await api.role.getTree(obj);
      let deptTree = await api.dept.getTree(obj);
      let avator = await api.user.getAvator(obj);
      data.data.entity = Object.assign({}, data.data.entity, {avator: avator.data.data !== '' ? `data:image/jpg;base64,${avator.data.data}` : ''});
      commit(type.SHOW, data.data);
      commit(type.GET_ROLETREE, roleTree.data.data);
      commit(type.GET_DEPTTREE, deptTree.data.data);
    }
    catch (e)
    {}
  },
  async save ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.save(obj);
      commit(type.SAVE, data.data);
    }
    catch (e)
    {}
  },
  async remove ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.remove(obj);
      commit(type.REMOVE, data.data);
    }
    catch (e)
    {}
  },
  async uploadAvator ({commit}, obj)
  {
    try
    {
      let {data} = await api.user.uploadAvator(obj);
      return data.data;
    }
    catch (e)
    {}
  }
};

export default actions;
