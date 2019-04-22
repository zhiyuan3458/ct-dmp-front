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
      this.$store.dispatch('backStageSystem/_DESK/getTree').then(data =>
      {
        let level = 1;
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList);
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
      this.$store.dispatch('backStageSystem/_DESK/showList', treeNode.id);
    },

    /**
     * 点击新增按钮触发
     * @author  lvzhiyuan
     * @date    2018/10/18
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.level === 1)
      {
        this.$store.dispatch('backStageSystem/_DESK/add', {systemId: treeNode.id});
        this.$common.stopEvent(event);
      }
      else
      {
        this.$message('“数据内容节点”下不能添加“目录结构节点”！');
        return false;
      }
    },

    /**
     * 点击删除按钮触发
     * @author  lvzhiyuan
     * @date    2018/10/18
     */
    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$confirm(`确认删除“${treeNode.text}”节点!?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('backStageSystem/_DESK/remove', {id: treeNode.id});
      });
      this.$common.stopEvent(event);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DESK', [
      'sideBar',
      'isRefreshTree',
      'indexTreeOperateBtns'
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
