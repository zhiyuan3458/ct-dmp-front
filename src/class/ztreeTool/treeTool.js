import { Message } from 'element-ui';
import tree from './tree';
export default class TreeTool extends tree
{
  constructor (treeDomId, treeNode, isCheck = false)
  {
    super();
    this.setting = {
      view: {
        selectedMulti: false,
        showIcon: false,
        addDiyDom: this.addDiyDom,
        expandSpeed: '100'
      },
      check: {
        enable: isCheck
      },
      data: {
        key: {
          name: 'text'
        },
        simpleData: {
          enable: true,
          idKey: 'id',
          pIdKey: 'parentId'
        }
      }
    };
    this.resourcesTree = $.fn.zTree.init($('#' + treeDomId), this.setting, treeNode);
    this.treeNode = treeNode;
  }

  // 取得树
  getTree ()
  {
    return this.resourcesTree;
  }

  // 设置带选择框的
  setCheck ()
  {
    this.resourcesTree.setting.check.enable = true;
  }
  // 勾选 checkbox 对于父子节点的关联关系
  setChkboxType (str)
  {
    this.resourcesTree.setting.check.chkboxType = str;
  }

  isRadioTree ()
  {
    this.resourcesTree.setting.check.chkStyle = 'radio';
    this.resourcesTree.setting.check.radioType = 'all';
  }

  // 设置是否多选，这个是对于按下 Ctrl 键可以选中多个节点
  // 暂时适用于是否允许多选
  setSelectedMulti (flag, nodeType, treeTool, hiddenFormName, displayFormName)
  {
    this.resourcesTree.setting.view.selectedMulti = flag;
    // 不可以多选时，如果选中了就给予相应的提示
    this.resourcesTree.setting.callback.onCheck = (event, treeId, treeNode) =>
    {
      // console.log(treeNode);
      // super.onCheck(treeNode, flag, nodeType, treeTool, hiddenFormName, displayFormName);
    };
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
  // 展开到第几级，跟节点为0
  expandLevel (treeId, level)
  {
    super.expandLevel(this.resourcesTree, treeId, level);
  }
  // 多级菜单，展开到第几级，跟节点为0
  treeExpandLevel (treeId)
  {
    return super.treeExpandLevel(this.resourcesTree, treeId);
  }
  // 添加节点自定义控件
  setAddDiyDom (addDiyDomFn)
  {
    if (addDiyDomFn === null || addDiyDomFn === '')
    {
      this.resourcesTree.setting.view.addDiyDom = this.addDiyDom;
    }
    else
    {
      this.resourcesTree.setting.view.addDiyDom = addDiyDomFn;
    }
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

  // 设置点击前事件
  setBeforeCheck (onBeforeCheck)
  {
    this.resourcesTree.setting.callback.beforeCheck = onBeforeCheck;
  }

  // 点击checkbox触发
  setOnCheck (onCheck)
  {
    this.resourcesTree.setting.callback.onCheck = onCheck;
  }

  // 设置加载完成事件
  setOnAsyncSuccess (onAsyncSuccess)
  {
    this.resourcesTree.setting.callback.onAsyncSuccess = onAsyncSuccess;
  }

  // 设置删除的返回函数
  removeCallBack (treeTool, json, treeNode)
  {
    if (json.code === 200)
    {
      treeTool.removeNode(treeNode);
      // showSubFrame(null);
    }
    else
    {
      Message.info({message: json.msg});
    }
  }

  // 取得选中的数量【checkbox树】
  getCheckedNodesCount ()
  {
    return this.resourcesTree.getCheckedNodes(true).length;
  }

  // 取得选中的信息列表【checkbox树】
  getCheckedNodes ()
  {
    return this.resourcesTree.getCheckedNodes(true);
  }

  // 取得节点的id信息列表【checkbox树】
  getCheckedNodesIds ()
  {
    let ids = '';
    let nodes = this.getCheckedNodes();
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

  // 取得节点的id信息列表，exceptTypes类型的除外【checkbox树】
  getCheckedNodesIdsExceptTypes (exceptTypes)
  {
    let ids = '';
    let nodes = this.getCheckedNodes();
    let count = nodes.length;
    let arrType = (exceptTypes == null || exceptTypes === '') ? new Array() : exceptTypes.split(',');
    let arrTypeLength = arrType.length;
    for (let i = 0; i < count; i++)
    {
      let id = nodes[i].id;
      let type = nodes[i].type;
      if (id !== 'root')
      {
        let flag = true;
        for (let j = 0; j < arrTypeLength; j++)
        {
          if (type === arrType[j])
          {
            flag = false;
            break;
          }
        }
        if (flag)
        {
          ids += nodes[i].id + ',';
        }
      }
    }
    return ids !== '' ? ids.substring(0, ids.lastIndexOf(',')) : '';
  }
  getCheckedNodesNamesExceptTypes (exceptTypes)
  {
    let names = '';
    let nodes = this.getCheckedNodes();
    let count = nodes.length;
    let arrType = (exceptTypes == null || exceptTypes === '') ? new Array() : exceptTypes.split(',');
    let arrTypeLength = arrType.length;
    for (let i = 0; i < count; i++)
    {
      let id = nodes[i].id;
      let type = nodes[i].type;
      if (id !== 'root')
      {
        let flag = true;
        for (let j = 0; j < arrTypeLength; j++)
        {
          if (type === arrType[j])
          {
            flag = false;
            break;
          }
        }
        if (flag)
        {
          names += nodes[i].text + ',';
        }
      }
    }
    return names !== '' ? names.substring(0, names.lastIndexOf(',')) : '';
  }

  // 判断root节点是否能操作
  isRootNode (treeNode)
  {
    this.treeNode = treeNode;
    return super.isRootNode(treeNode);
  }

  // 个性化文字样式，只针对 zTree 在节点上显示的<A>对象。
  setFontCss = function (setFontCss)
  {
    this.resourcesTree.setting.view.fontCss = setFontCss;
  }

  addDiyDom (treeId, treeNode)
  {
    let aObj = $('#' + treeNode.tId + '_a');
    if ($('#diyBtn_' + treeNode.id).length > 0) return;
    let editStr = `<span class="${treeNode.iconSkin}" style="font-size: 14px;"></span>`;
    aObj.prepend(editStr);
  };
}
