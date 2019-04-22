import { postHttp } from '@/api/util';
import { Message } from 'element-ui';
import tree from './tree';
export default class DragDropTree extends tree
{
  constructor (resourcesTree)
  {
    super();
    // 属性需要在前台页面进行设置否则是不能拖动的
    this.resourcesTree = resourcesTree;
    this.treeNode = null;
  }

  // 取得树
  getTree ()
  {
    return this.resourcesTree;
  }

  /**
   * 获取树的层级（获取树有多少层级level）
   * @author   lvzhiyuan
   * @date     2018/10/18
   */
  getTreeLevel (treeId)
  {
    return super.getTreeLevel(this.resourcesTree, treeId);
  }

  // 设置操作权限
  init (dropUrl, beforeDrop)
  {
    this.setBeforeDrop(beforeDrop);
    this.setOnDrop(dropUrl);
  }

  // 设置操作权限
  setOperatePrivilege (operates)
  {
    super.setOperatePrivilege(operates, this.resourcesTree);
  }

  // 收起和打开
  treeExpandAll (type)
  {
    this.resourcesTree.expandAll(type);
  }

  // 设置带选择框的
  setCheck ()
  {
    this.resourcesTree.setting.check.enable = true;
  }
  setIcon ()
  {
    this.resourcesTree.setting.view.addDiyDom = super.addDiyDom;
  }

  // 取得选中的节点信息
  getSelectNode (event)
  {
    return super.getSelectNode(event, this.resourcesTree);
  }

  // 删除节点
  removeNode (treeNode)
  {
    this.treeNode = treeNode;
    this.resourcesTree.removeNode(treeNode);
  }

  // 设置点击事件
  setOnClick (onClickFn)
  {
    this.resourcesTree.setting.callback.onClick = onClickFn;
  }

  // 设置加载完成事件
  setOnAsyncSuccess (onAsyncSuccess)
  {
    this.resourcesTree.setting.callback.onAsyncSuccess = onAsyncSuccess;
  }

  // 判断root节点是否能操作
  isRootNode (treeNode)
  {
    this.treeNode = treeNode;
    return super.isRootNode(treeNode);
  }

  // 设置拖动函数
  setBeforeDrop (beforeDrop)
  {
    if (beforeDrop != null)
    {
      this.resourcesTree.setting.callback.beforeDrop = beforeDrop;
    }
    else
    {
      this.resourcesTree.setting.callback.beforeDrop = function (treeId, treeNodes, targetNode, moveType)
      {
        if (!treeNodes) return false;
        let sourceNode = treeNodes[0];
        let drop = true;
        let targetId = targetNode.id;
        if (targetId === 'root' && moveType !== 'inner')
        {
          Message.info('“' + sourceNode.text + '” 节点不能拖拽到根节点外!');
          drop = false;
        }
        return drop;
      };
    }
  }

  // 设置拖动函数
  setOnDrop (dropUrl)
  {
    this.resourcesTree.setting.callback.onDrop = function (event, treeId, treeNodes, targetNode, moveType)
    {
      if (!targetNode) return;
      if (!treeNodes) return;
      let targetId = targetNode.id;
      let sourceNode = treeNodes[0];
      let sourceId = sourceNode.id;
      let targetType = targetNode.type;
      let sourceType = sourceNode.type;
      let params = {targetId: targetId, sourceId: sourceId, moveType: moveType, code: sourceNode.code, targetType: targetType, sourceType: sourceType};
      postHttp(dropUrl, params).then(res =>
      {
        // 作为子节点。
        if (moveType === 'inner')
        {
          sourceNode.parentId = targetId;
        }
        else
        {
          sourceNode.parentId = targetNode.parentId;
        }
      });
      // $.post(dropUrl, params, function (result)
      // {
      //   // 作为子节点。
      //   if (moveType === 'inner')
      //   {
      //     sourceNode.parentId = targetId;
      //   }
      //   else
      //   {
      //     sourceNode.parentId = targetNode.parentId;
      //   }
      // });
    };
  }

  // 设置删除的返回函数
  removeCallBack (treeTool, json, treeNode)
  {
    if (json.code === 200)
    {
      this.resourcesTree.removeNode(treeNode);
      // showSubFrame(null);
    }
    else
    {
      Message.info({message: json.msg});
    }
  }

  // 取得节点的id信息列表【checkbox树】
  getCheckedNodesIds ()
  {
    let ids = '';
    let nodes = this.resourcesTree.getCheckedNodes();
    let count = nodes.length;
    for (let i = 0; i < count; i++)
    {
      let id = nodes[i].id;
      if (id !== 'root')
      {
        ids += nodes[i].id + ',';
      }
    }
    return ids !== '' ? ids.substring(0, ids.lastIndexOf(',')) : '';
  }
  // 展开到第几级，跟节点为0
  expandLevel (treeId, level)
  {
    super.expandLevel(this.resourcesTree, treeId, level);
  }
  // 多级菜单，展开到第几级，跟节点为0
  treeExpandLevel ()
  {
    super.treeExpandLevel(this.resourcesTree, this.resourcesTree.setting.treeId);
  }

  // 个性化文字样式，只针对 zTree 在节点上显示的<A>对象。
  setFontCss (setFontCss)
  {
    this.resourcesTree.setting.view.fontCss = setFontCss;
  }
}
