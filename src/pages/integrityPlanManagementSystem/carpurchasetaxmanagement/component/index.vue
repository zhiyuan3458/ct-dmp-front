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
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    initTree ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT/getTree').then(data =>
      {
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
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        this.metaData.treeTool.init('/api/plan/pm/po/carpurchasetaxmanagement/dragDrop', this.beforeDrop);
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', 3);
      });
    },
    /**
     * 点击
     * @author   yekuncai
     * @date     2019/4/12
     */
    clickFn (event, treeId, treeNode)
    {
      this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT/edit', { id: treeNode.id });
    },
    /**
     * 新增树节点
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT/add', { parentId: treeNode.id });
      this.$common.stopEvent(event);
    },

    /**
     * 删除树节点
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.level === 0)
      {
        this.$message('根节点不能删除!');
        return false;
      }
      this.$confirm('确认要删除“' + treeNode.text + '”节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT/remove', { id: treeNode.id }).then(data =>
        {
          this.initTree();
        });
      });
      this.$common.stopEvent(event);
    },
    beforeDrop (treeId, treeNodes, targetNode, moveType)
    {
      // if (!treeNodes)
      // {
      //   return false;
      // }
      // let sourceNode = treeNodes[0];
      let drop = true;
      // // type节点类型，1：模块，0：页面.
      // let targetType = targetNode.type;
      // let targetId = targetNode.id;
      // if (targetType === '0' && moveType === 'inner')
      // {
      //   this.$message(`“${targetNode.text}”是页面节点，不能接收子节点!`);
      //   drop = false;
      // }
      // else if (targetId === 'root' && moveType !== 'inner')
      // {
      //   this.$message(`“${sourceNode.text}” 节点不能拖拽到根节点外!`);
      //   drop = false;
      // }
      // else if (targetId === 'root' && moveType === 'inner')
      // {
      //   this.$message('根节点不能接收页面节点！');
      //   drop = false;
      // }
      return drop;
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_CARPURCHASETAXMANAGEMENT', [
      'isRefresh'
    ])
  },
  /**
   * 初始化树
   * @author   lvzhiyuan
   * @date     2018/10/20
   */
  created ()
  {
    this.initTree();
  },
  watch: {
    isRefresh ()
    {
      this.initTree();
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
