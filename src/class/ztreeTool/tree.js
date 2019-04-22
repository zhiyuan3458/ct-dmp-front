import { Message } from 'element-ui';
import {postHttp} from '../../api/util';

export default class Tree
{
  treeExpandLevel = 0;
  // 设置权限
  setOperatePrivilege (operates, resourcesTree)
  {
    if (operates && operates !== '')
    {
      resourcesTree.setting.view.addHoverDom = function (treeId, treeNode)
      {
        if (treeNode.showOperatePrivilege)
        {
          let sObj = $(`#${treeNode.tId}_span`);
          let style = `margin-left:8px;font-size: 16px;text-decoration: none!important;`;
          operates.forEach((value, key, mapObj) =>
          { // value:键值对的值;key:键值对的键;mapObj:Map对象
            if ($(`#${key.name}Btn_${treeNode.id}`).length > 0) return;
            let addStr = `<a style='${style}' class='zTreeButton ${key.name}_ico_docu ${key.icon}' lang='${treeNode.tId}' id='${key.name}Btn_${treeNode.id}' ></a>`;
            addStr += `<input type='hidden' id='${key.name}${treeNode.id}' value='${treeNode.tId}'/>`;
            sObj.append(addStr);
            let btn = $(`#${key.name}Btn_${treeNode.id}`);
            if (btn) btn.bind('click', value);
            style = `margin-left:2px;font-size: 16px;`;
          });
        }
      };
      resourcesTree.setting.view.removeHoverDom = function (treeId, treeNode)
      {
        operates.forEach((value, key, mapObj) =>
        {
          $(`#${key.name}Btn_${treeNode.id}`).unbind().remove();
          $(`#${key.name}${treeNode.id}`).unbind().remove();
        });
      };
    }
  }

  getSelectNode (event, resourcesTree)
  {
    let id = event.target.id;
    let arr = id.split('Btn_');
    let tId = $('#' + arr[0] + arr[1]).val();
    let treeNode = resourcesTree.getNodeByTId(tId);
    return treeNode;
  }

  /**
   * 判断是不是root节点
   * @param {} treeNode
   * @param {} isShowTips 显示提示框
   */
  isRootNode (treeNode, isShowTips)
  {
    let flag = false;
    if (treeNode.id === 'root')
    {
      flag = true;
      if (isShowTips != null && isShowTips === true)
      {
        Message.info('');
      }
    }
    return flag;
  }

  getDragDropSetting (url)
  {
    let setting = {
      async: {
        enable: true,
        url: url
      },
      view: {
        selectedMulti: false
      },
      edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
      },
      data: {
        key: {name: 'text'},
        simpleData: {enable: true, idKey: 'id', pIdKey: 'parentId'}
      }
    };
    return setting;
  }

  /**
   * 树节点的点击，添加处理函数
   * @param {} rootAction  根节点Action
   * @param {} nodeAction  节点Action
   * @param {} event    事件
   * @param {} treeNode  当前节点
   * @param {} rootCanOperate      根节点是否能操作, false
   * @param {} parentNodeCanOperate  父节点是否能操作, false
   * @param {} isShowPageLoading    是否显示加载页面, true
   */
  treeHandleFn (rootAction, nodeAction, event, treeNode, rootCanOperate, parentNodeCanOperate, isShowPageLoading)
  {
    let returnUrl = '';
    // 判断当前节点是不是root
    if (this.isRootNode(treeNode))
    {
      if (rootCanOperate !== false)
      {
        if (this.validateAction(rootAction, event))
        {
          returnUrl = rootAction;
        }
      }
      else
      {
        this.validateAction('', event);
      }
    }
    else
    {
      if (parentNodeCanOperate === false && treeNode.isParent === true)
      {
        this.validateAction('', event);
      }
      else
      {
        if (this.validateAction(nodeAction, event))
        {
          returnUrl = nodeAction;
        }
      }
    }
    if (returnUrl !== null && returnUrl !== '')
    {
      // showSubFrame(returnUrl, event, isShowPageLoading);
    }
  }

  /**
   * 树节点的删除处理函数
   * @param {} treeTool  树
   * @param {} nodeAction  节点Action
   * @param {} event    事件
   * @param {} params    参数
   */
  treeRemoveHandleFn (treeTool, nodeAction, event)
  {
    let treeNode = treeTool.getSelectNode(event);
    if (this.isRootNode(treeNode))
    {
      this.validateAction('', event, '该节点不能删除，请选择其它节点！');
    }
    else
    {
      if (this.validateAction(nodeAction, event))
      {
        top.Dialog.confirm('确认要删除？|提示信息', function ()
        {
          let params = {id: treeNode.id};
          postHttp(nodeAction, params).then(res =>
          {
            treeTool.removeCallBack(treeTool, res, treeNode);
          });
        }, function ()
        {
        });
      }
    }
    stop(event);
  }

  /**
   * 验证action是否正确
   * @param {} action
   * @param {} event
   * @param {} tips
   */
  validateAction (action, event, tips)
  {
    let flag = true;
    if (action == null || action === '')
    {
      stop(event);
      flag = false;
    }
    return flag;
  }

  onCheck (treeNode, flag, nodeType, treeTool, hiddenFormName, displayFormName)
  {
    if (flag === false)
    {
      let count = this.getSelectNodesCount(nodeType, treeTool);
      if (count > 1)
      {
        treeTool.getTree().checkNode(treeNode, false, true);
        Message.info('只能选择一个节点！');
      }
    }
    if (hiddenFormName != null || displayFormName != null)
    {
      this.setFormValue(nodeType, treeTool, hiddenFormName, displayFormName);
    }
  }

  valueIsExistInArray (value, arr)
  {
    let flag = false;
    for (var i = 0; i < arr.length; i++)
    {
      if (value === arr[i])
      {
        flag = true;
        break;
      }
    }
    return flag;
  }

  setFormValue (nodeType, treeTool, hiddenFormName, displayFormName)
  {
    let hiddenValue = '';
    let displayValue = '';
    let nodes = treeTool.getCheckedNodes(true);
    let checkedNodeIds = new Array();
    for (let i = 0; i < nodes.length; i++)
    {
      let node = nodes[i];
      if (node.type === nodeType && !this.valueIsExistInArray(node.id, checkedNodeIds))
      {
        checkedNodeIds[i] = node.id;
        hiddenValue += hiddenValue === '' ? node.id : (',' + node.id);
        displayValue += displayValue === '' ? node.text : (',' + node.text);
      }
    }
  }

  getSelectNodesCount (treeTool)
  {
    let count = 0;
    let nodes = treeTool.getCheckedNodes(true);
    for (let i = 0; i < nodes.length; i++)
    {
      // let node = nodes[i];
      count++;
      /* if (node.type === nodeType)
      {
        count++;
      } */
    }
    return count;
  }

  /**
   * 拖拽节点, 是否允许拖拽(默认是允许的)
   * @param {} treeNodes      拖动的节点
   * @param {} targetNode      目标节点
   * @param {} moveType      移动类型，有inner(插入内部)，prev(上面)，next(下面)
   * @param {} parentType      所属的父类型，可以有多个以“,”隔开(无空格)
   * @param {} isSelfContained  是否自包含的，如导航栏，有parentId的类对象
   */
  isCanDragDropTreeNode (treeNodes, targetNode, moveType, dragType, parentType, isSelfContained)
  {
    // showSubFrame('');
    if (!treeNodes) return false;
    let sourceNode = treeNodes[0];
    let targetType = targetNode.type;
    let sourceType = sourceNode.type;
    let targetId = targetNode.id;
    if (!dragType || dragType !== sourceType)
    {
      Message.info('“' + sourceNode.text + '”节点不能拖动，请选择其它节点！');
      return false;
    }
    // 不允许拖拽到根节点外
    let drop = !this.isDragOutOfRoot(targetId, sourceNode, moveType);
    if (drop)
    {
      if (isSelfContained != null && isSelfContained === true)
      {
        if (parentType != null && parentType !== '')
        {
          parentType += ',' + sourceType;
        }
        else
        {
          parentType += sourceType;
        }
      }
      let flag = false;
      // 所属的父类型
      if (parentType && moveType === 'inner')
      {
        let arrParentType = parentType.split(',');
        let length = arrParentType.length;
        for (let i = 0; i < length; i++)
        {
          if (arrParentType[i] === targetType)
          {
            flag = true;
          }
        }
        if (!flag)
        {
          Message.info('“' + targetNode.text + '”节点不能接收“' + sourceNode.text + '”节点！');
        }
      }
      else if (!parentType && moveType === 'inner')
      {
        Message.info('“' + targetNode.text + '”节点不能接收“' + sourceNode.text + '”节点！');
        flag = false;
      }
      else if (targetType === sourceType && (moveType === 'prev' || moveType === 'next'))
      {
        flag = true;
      }
      else if (targetType !== sourceType && (moveType === 'prev' || moveType === 'next'))
      {
        Message.info('“' + sourceNode.text + '”节点不能拖拽到“' + targetNode.text + '”节点外！');
        flag = false;
      }
      drop = flag;
    }
    return drop;
  }

  /**
   * 是否拖拽到跟节点外
   */
  isDragOutOfRoot (targetId, sourceNode, moveType)
  {
    let drop = false;
    if (targetId === 'root' && moveType !== 'inner')
    {
      Message.info('“' + sourceNode.text + '” 节点不能拖拽到跟节点外!');
      drop = true;
    }
    return drop;
  }

  /**
   *展开到第几级，跟节点为0
   */
  expandLevel (treeObj, treeId, level)
  {
    let nodes = treeObj.getNodesByParam('level', level, null);
    treeObj.expandAll(true);
    for (let k = 0; k < nodes.length; k++)
    {
      treeObj.expandNode(nodes[k], false, true, false);
    };
  }

  /**
   * 获取树的层级（获取树有多少层级level）
   * @author   lvzhiyuan
   * @date     2018/10/18
   */
  getTreeLevel (treeObj, treeId)
  {
    let nodes = treeObj.transformToArray(treeObj.getNodes());
    let arr = new Array();
    for (let i = 0; i < nodes.length; i++)
    {
      arr.push(nodes[i].level);
    }
    let temp = this.unique(arr);
    let arrItems = new Array();
    for (let i = 1; i < temp.length; i++)
    {
      let json = {
        text: '展开到第:' + temp[i] + '级',
        click: this.itemclick,
        iconClass: 'ct-icon-form3-dark-orange',
        disabled: false,
        value: temp[i],
        treeId: treeId
      };
      arrItems.push(json);
    }
    return arrItems;
  }

  /**
   *多级菜单，展开到第几级，跟节点为0
   */
  treeExpandLevel (treeObj, treeId)
  {
    let nodes = treeObj.transformToArray(treeObj.getNodes());
    let arr = new Array();
    for (let i = 0; i < nodes.length; i++)
    {
      arr.push(nodes[i].level);
    }
    let temp = this.unique(arr);
    let arrItems = new Array();
    for (let i = 1; i < temp.length; i++)
    {
      let json = {
        text: '展开到第:' + temp[i] + '级',
        click: this.itemclick,
        iconClass: 'ct-icon-form3-dark-orange',
        disabled: false,
        value: temp[i],
        treeId: treeId,
        treeObj: treeObj
      };
      arrItems.push(json);
    }
    $('#openId').bind('click', function (e)
    {
      return false;
    });
  }

  /**
   *去掉重复数据，数组
   **/
  unique (arr)
  {
    let result = [];
    let hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++)
    {
      if (!hash[elem])
      {
        result.push(elem);
        hash[elem] = true;
      }
    }
    return result;
  }

  itemclick (item)
  {
    this.treeExpandLevel = parseInt(item.value);
    this.expandLevel(item.treeId, this.treeExpandLevel);
  }

  getTreeExpandLevel ()
  {
    return this.treeExpandLevel === 0 ? 1 : this.treeExpandLevel;
  }
}
