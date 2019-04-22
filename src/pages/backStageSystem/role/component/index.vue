<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import DragDropTreeTool from '@/class/ztreeTool/dragDropTree';
export default {
  data ()
  {
    return {
      metaData: {
        treeTool: null,
        treeLevel: [],
        setting: {
          view: {
            /* 不显示ztree默认的图标 */
            showIcon: false,
            selectedMulti: false,
            addDiyDom: this.$common.addDiyDom
          },
          edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
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
        }
      }
    };
  },
  methods: {
    /**
     * 初始化或更新subLeftTree树
     * @author   yekuncai
     * @date     2018/10/22
     */
    initTree ()
    {
      this.$store.dispatch('backStageSystem/_ROLE/getTree').then(data =>
      {
        let level = 2;
        if (this.metaData.treeTool !== null)
        {
          level = this.metaData.treeTool.getTreeExpandLevel();
        }
        let resourcesTree = $.fn.zTree.init($('#subLeftTree'), this.metaData.setting, data.ztreeList);
        this.metaData.treeTool = new DragDropTreeTool(resourcesTree);
        let operateBtns = data.operateBtns;
        let length = operateBtns.length;
        let map = new Map();
        for (let i = 0; i < length; i++)
        {
          let key = {name: operateBtns[i].displayValue, icon: operateBtns[i].icon};
          map.set(key, Reflect.get(this, `${operateBtns[i].displayValue}Fn`));
        }
        this.setOperatePrivilege(map, this.metaData.treeTool.getTree());
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.metaData.treeTool.init('/api/backstage/sys/bs/role/dragDrop', this.beforeDrop);
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', level);
      });
    },
    // 点击侧导航栏的上部图标触发
    clickTopBtn (e)
    {
      let iconClass = e.target.className;
      /* global $ */
      var treeObj = $.fn.zTree.getZTreeObj('subLeftTree');
      if (iconClass.indexOf('ct-icon-folder-collaspe') >= 0)
      {
        treeObj.expandAll(false);
      }
      else
      {
        treeObj.expandAll(true);
      }
    },

    /**
     * 树节点点击回调函数
     * @author  lvzhiyuan
     * @date    2018/6/1
     */
    clickFn (event, treeId, treeNode)
    {
      if (treeNode.type === 'Role')
      {
        this.$store.dispatch('backStageSystem/_ROLE/edit', treeNode.id);
      }
      else
      {
        this.$message(`${treeNode.text}节点不是角色节点！`);
      }
      this.$common.stopEvent(event);
    },
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$store.dispatch('backStageSystem/_ROLE/add', {deptId: treeNode.id});
      this.$common.stopEvent(event);
    },

    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$confirm(`确认要删除'${treeNode.text}'节点?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('backStageSystem/_ROLE/remove', {
          type: treeNode.type,
          id: treeNode.id
        }).then(data =>
        {
          if (data.data !== undefined && data.data !== '')
          {
            this.$message(`${treeNode.text}节点的子节点不为空`);
          }
          else
          {
            this.initTree();
          }
        });
      });
      this.$common.stopEvent(event);
    },

    beforeDrop (treeId, treeNodes, targetNode, moveType)
    { // 拖拽
      // type, 1:模块类型, 0:操作类型
      if (!treeNodes)
      {
        return false;
      }
      let sourceNode = treeNodes[0];
      let drop = true;
      let targetType = targetNode.type;
      let sourceType = sourceNode.type;
      let targetId = targetNode.id;
      if (targetType === '0' && moveType === 'inner')
      {
        this.$message(`"${targetNode.text}"是操作节点，不能接收子节点!`);
        drop = false;
      }
      else if (targetId === 'root' && moveType !== 'inner')
      {
        this.$message(`"${sourceNode.text}"节点不能拖拽到跟节点外!`);
        drop = false;
      }
      else if (targetType === 'Role' && sourceType === 'Role' && moveType === 'inner')
      {
        this.$message(`"${sourceNode.text}"为角色节点,不能拖拽到角色节点内!`);
        drop = false;
      }
      else if ((sourceType === 'Dept' || sourceType === 'DeptRoot') && sourceType === 'Role' && (moveType === 'prev' || moveType === 'next'))
      {
        drop = false;
      }
      else if (targetId === 'root' && moveType === 'inner')
      {
        this.$message('跟节点不能接收操作节点！');
        drop = false;
      }
      else if (sourceType === 'Dept' || sourceType === 'DeptRoot')
      {
        this.$message('部门节点不能拖拽！');
        drop = false;
      }
      return drop;
    },
    /**
     * 重新设置树权限
     * @author   chenguang
     * @date     2018/12/5
     */
    setOperatePrivilege (operates, resourceTree)
    {
      if (operates && operates !== '')
      {
        resourceTree.setting.view.addHoverDom = function (treeId, treeNode)
        {
          if (treeNode.showOperatePrivilege && treeNode.type !== 'root')
          {
            let sObj = $(`#${treeNode.tId}_span`);
            let style = `margin-left:8px;font-size: 16px;text-decoration: none!important;`;
            operates.forEach((value, key, mapObj) =>
            { // value:键值对的值;key:键值对的键;mapObj:Map对象
              if (((treeNode.type === 'Dept' || treeNode.type === 'DeptRoot') && key.name === 'add') || (treeNode.type === 'Role' && key.name === 'remove'))
              { // 部门节点只有新增功能,角色节点只有删除功能
                if ($(`#${key.name}Btn_${treeNode.id}`).length > 0) return;
                let addStr = `<a style='${style}' class='zTreeButton ${key.name}_ico_docu ${key.icon}' lang='${treeNode.tId}' id='${key.name}Btn_${treeNode.id}' ></a>`;
                addStr += `<input type='hidden' id='${key.name}${treeNode.id}' value='${treeNode.tId}'/>`;
                sObj.append(addStr);
                let btn = $(`#${key.name}Btn_${treeNode.id}`);
                if (btn) btn.bind('click', value);
                style = `margin-left:2px;font-size: 16px;`;
              }
            });
          }
        };
        resourceTree.setting.view.removeHoverDom = function (treeId, treeNode)
        {
          operates.forEach((value, key, mapObj) =>
          {
            $(`#${key.name}Btn_${treeNode.id}`).unbind().remove();
            $(`#${key.name}${treeNode.id}`).unbind().remove();
          });
        };
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_ROLE', [
      'isRefreshTree'
    ])
  },
  mounted ()
  {
    this.initTree();
  },
  watch: {
    isRefreshTree (newVal, oldVal)
    {
      if (newVal)
      {
        this.initTree();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
