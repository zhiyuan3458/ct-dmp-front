import api from '@/api/backStageSystem/api';

/**
 * 获取每一步审批节点的审批信息.
 * @author   yekuncai
 * @date     2018/12/27
 */
export async function getInformation (params)
{
  let info = { processInstanceId: params };
  let { data } = await api.todoTask.getInfo(info);
  // 判断下一个节点是否是结束节点
  info.isShowTree = eval(data.data.isLast);

  // 判断是否启用意见处理
  info.isShowComment = eval(data.data.seniorSetting.commentFlag);

  // 获取审批按钮
  let nodeSenior = data.data.nodeSenior;
  for (let i = 0; i < data.data.operateBtns.length; i++)
  {
    if (nodeSenior[data.data.operateBtns[i].displayValue] === '禁用')
    {
      data.data.operateBtns.remove(data.data.operateBtns[i]);
    }
  }
  info.operateBtns = data.data.operateBtns;

  // 获取节点设置信息
  let nodeSetting = data.data.nodeSetting;
  info.multiprocessor = nodeSetting.multiprocessor;
  info.userNames = nodeSetting.userHandler;
  info.roleNames = nodeSetting.roleHandler;

  // 获取用户树
  let userTree = await api.user.getUserTree({ userIds: nodeSetting.userHandler });
  userTree = userTree.data.data.ztreeList;
  if (nodeSetting.starterFlag === '否')
  {
    for (let i = 0; i < userTree.length; i++)
    {
      if (userTree[i].id === data.data.currUserId)
      {
        userTree.remove(userTree[i]);
      }
    }
  }
  info.userTree = userTree;
  // 获取角色书
  let roleTree = await api.role.getRoleTree({ roleIds: nodeSetting.roleHandler });
  info.roleTree = roleTree.data.data.ztreeList;

  return info;
}
