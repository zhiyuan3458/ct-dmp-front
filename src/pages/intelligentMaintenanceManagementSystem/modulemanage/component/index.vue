<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author   yekuncai
 * @date     2018/10/22
 */
import { mapGetters } from 'vuex';
import DragDropTreeTool from '@/class/ztreeTool/dragDropTree';
import prifix from '@/common/js/urlPrifix';
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
     * @author   liangyi
     * @date     2019/4/15
     */
    initTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/getTree').then(data =>
      {
        let level = 1;
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
        this.metaData.treeTool.setOperatePrivilege(map);
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.metaData.treeTool.init(prifix.maintenance + '/mt/dt/moduletree/dragDrop', this.beforeDrop);
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', level);
      });
    },

    /**
     * 树节点点击回调函数
     * @author   liangyi
     * @date     2019/4/15
     */
    clickFn (event, treeId, treeNode)
    {
      if (treeNode.level < 3)
      {
        this.$message.info('请选择子节点');
      }
      else
      {
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/editDetail', {moduleTreeId: treeNode.id});
      }
    },

    /**
     * 点击新增按钮触发
     * @author   liangyi
     * @date     2019/4/15
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      let moduleId = '';
      if (treeNode.level === 1)
      {
        moduleId = treeNode.id;
      }
      else
      {
        moduleId = treeNode.type;
      }
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/add', {parentId: treeNode.id, level: treeNode.level + 1, moduleId: moduleId});
      this.$common.stopEvent(event);
    },

    /**
     * 点击新增按钮触发
     * @author   liangyi
     * @date     2019/4/15
     */
    editFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/edit', {id: treeNode.id});
      this.$common.stopEvent(event);
    },

    /**
     * 点击删除按钮触发
     * @author   liangyi
     * @date     2019/4/15
     */
    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$confirm(`将会删除模板下的所有子表!\t确认删除“${treeNode.text}”!?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_MODULEMANAGE/remove', {
          type: treeNode.type,
          id: treeNode.id
        }).then(data =>
        {
          this.initTree();
        });
      });
      this.$common.stopEvent(event);
    },

    beforeDrop (treeId, treeNodes, targetNode, moveType)
    {
      if (!treeNodes)
      {
        return false;
      }
      let sourceNode = treeNodes[0];
      let drop = true;
      // type节点类型，1：模块，0：页面.
      let targetType = targetNode.type;
      let targetId = targetNode.id;
      if (targetType === '0' && moveType === 'inner')
      {
        this.$message(`“${targetNode.text}”是页面节点，不能接收子节点!`);
        drop = false;
      }
      else if (targetId === 'root' && moveType !== 'inner')
      {
        this.$message(`“${sourceNode.text}” 节点不能拖拽到根节点外!`);
        drop = false;
      }
      return drop;
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_MODULEMANAGE', [
      'sideBar',
      'isRefreshTree'
    ])
  },
  watch: {
    /**
     * 如果isRefreshTree为true则重新刷新subLeftTree
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.initTree();
      }
    }
  },
  /**
   * 初始化树
   * @author   lvzhiyuan
   * @date     2018/10/20
   */
  mounted ()
  {
    this.initTree();
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
