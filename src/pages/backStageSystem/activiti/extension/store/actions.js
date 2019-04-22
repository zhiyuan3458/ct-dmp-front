import api from '@/api/backStageSystem/api';
import type from './mutation-type';
const actions = {
  async getTree ({commit}, obj)
  {
    let {data} = await api.extension.getTree(obj);
    return data.data;
  },
  async starterEdit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    // 高级属性设置
    let senior = await api.extension.seniorSettingEdit(obj);
    commit(type.SENIORSETTING, senior.data.data);

    // 设置显示组件
    let {data} = await api.extension.starterEdit(obj);
    // 获取用户树
    let userIds = { userIds: data.data.entity.userIds };
    let userTree = await api.user.getUserTree(userIds);
    data.data.userTree = userTree.data.data.ztreeList;
    // 获取角色书
    let roleIds = { roleIds: data.data.entity.roleIds };
    let roleTree = await api.role.getRoleTree(roleIds);
    data.data.roleTree = roleTree.data.data.ztreeList;
    // 流程定义版本节点id
    data.data.versionId = obj.versionId;
    commit(type.STARTEREIDT, data.data);
    commit(type.IS_LOADING, false);

    // 流程图数据
    let flowChart = await api.extension.flowChart(obj);
    commit(type.FLOWCHART, flowChart.data.data.entity);
  },
  async nodeEdit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    // 设置显示组件
    let {data} = await api.extension.nodeEdit(obj);
    // 获取处理者用户树
    let userHandler = { userIds: data.data.entity.userHandler };
    let userTree = await api.user.getUserTree(userHandler);
    data.data.userHandler = userTree.data.data.ztreeList;
    // 获取处理者角色树
    let roleHandler = { userIds: data.data.entity.roleHandler };
    let roleTree = await api.role.getRoleTree(roleHandler);
    data.data.roleHandler = roleTree.data.data.ztreeList;

    // 获取读者用户树
    let userReader = { userIds: data.data.entity.userReader };
    let userReaderTree = await api.user.getUserTree(userReader);
    data.data.userReaderTree = userReaderTree.data.data.ztreeList;
    // 获取读者角色树
    let roleReader = { userIds: data.data.entity.roleReader };
    let roleReaderTree = await api.role.getRoleTree(roleReader);
    data.data.roleReaderTree = roleReaderTree.data.data.ztreeList;
    data.data.coords = obj.coords;
    commit(type.NODEEIDT, data.data);
    commit(type.IS_LOADING, false);

    // 节点高级属性设置
    let nodeSenior = await api.extension.nodeSeniorEdit(obj);
    commit(type.NODESENIOREDIT, nodeSenior.data.data);

    return data;
  },
  async saveStarter ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.extension.saveStarter(obj);
    console.log(data.data);
    commit(type.SETDATA, data.data);
    commit(type.IS_LOADING, false);
    return data;
  },
  async saveNodeEdit ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.extension.saveNodeEdit(obj);
    commit(type.SETDATA, data.data);
    commit(type.IS_LOADING, false);
    return data;
  },
  async saveNodeSenior ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.extension.saveNodeSenior(obj);
    commit(type.NODESENIOREDIT, data.data);
    commit(type.IS_LOADING, false);
    return data;
  },
  async saveSeniorSetting ({commit}, obj)
  {
    commit(type.IS_LOADING, true);
    let {data} = await api.extension.saveSeniorSetting(obj);
    commit(type.SENIORSETTING, data.data);
    commit(type.IS_LOADING, false);
    return data;
  },
  setProcessDefinitionId ({commit}, obj)
  {
    commit(type.FLOWCHART, obj);
  },
  setIsLoading ({commit}, obj)
  {
    commit(type.IS_LOADING, obj);
  }
};

export default actions;
