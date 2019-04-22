<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import TreeTool from '@/class/ztreeTool/treeTool';
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
            selectedMulti: false
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/getRightTree', {id: this.scoreTableId}).then(data =>
      {
        let level = 1;
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList);
        /* let operateBtns = data.operateBtns;
        let length = operateBtns.length;
        let map = new Map();
        for (let i = 0; i < length; i++)
        {
          let key = {name: operateBtns[i].displayValue, icon: operateBtns[i].icon};
          map.set(key, Reflect.get(this, `${operateBtns[i].displayValue}Fn`));
        }
        this.metaData.treeTool.setOperatePrivilege(map); */
        this.metaData.treeTool.setOnClick(this.clickFn);
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
     * @author  lvzhiyuan
     * @date    2018/6/1
     */
    clickFn (event, treeId, treeNode)
    {
      if (treeNode.level < 2)
      {
        this.$message.info('请选择子节点');
      }
      else
      {
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/editDetail', {
          moduleTreeId: treeNode.id,
          scoreTableId: this.scoreTableId
        });
      }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SCORETABLE', [
      'scoreTableId'
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
    },
    treeList (newValue, oldValue)
    {
      if (newValue.length !== 0)
      {
        this.initTree();
      }
    },
    scoreTableId: {
      handler ()
      {
        this.initTree();
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
