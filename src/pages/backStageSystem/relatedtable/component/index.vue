<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author lvzhiyuan
 * @date   2018/6/1
 */
import { mapGetters } from 'vuex';
import TreeTool from '@/class/ztreeTool/treeTool';
export default {
  data ()
  {
    return {
      metaData: {
        treeTool: null,
        treeLevel: []
      }
    };
  },
  methods: {
    /**
     * 初始化树
     * @author   chenguang
     * @date     2018/11/27
     */
    initTree ()
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/getTree').then(data =>
      {
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList, false);
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
        this.metaData.treeTool.expandLevel('subLeftTree', 3);
      });
    },
    // 点击侧导航栏的上部图标触发
    clickTopBtn (e)
    {
      let iconClass = e.target.className;
      /* global $ */
      var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
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
     * 树节点点击回调
     * @author   chenguang
     * @date     2018/11/27
     */
    clickFn (event, treeId, treeNode)
    {
      if (treeNode.type !== 'root')
      {
        this.$store.dispatch('backStageSystem/_RELATEDTABLE/edit', {id: treeNode.id});
      }
    },
    /**
     * 新增关联表节点
     * @author   chenguang
     * @date     2018/11/27
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/add', {parentId: treeNode.id});
      this.$common.stopEvent(event);
    },

    /**
     * 删除树节点
     * @author   chenguang
     * @date     2018/11/27
     */
    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$confirm(`确认要删除“${treeNode.text}”节点?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('backStageSystem/_RELATEDTABLE/remove', {id: treeNode.id});
      });
      this.$common.stopEvent(event);
    },
    /**
     * 查询关联表的列表数据
     * @author   chenguang
     * @date     2018/11/27
     */
    listFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.type !== 'root')
      {
        if (treeNode.type === 'table')
        { // table节点
          this.$store.dispatch('backStageSystem/_RELATEDTABLE/showList', {id: treeNode.id});
        }
        else
        {
          // 子系统和模块节点,没有列表内容
        }
      }
      this.$common.stopEvent(event);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_RELATEDTABLE', [
      'sideBar',
      'isRefreshTree'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    }
  },
  watch: {
    opened ()
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      const topToolBarHeight = document.querySelector('.topToolBar').offsetHeight;
      if (this.opened)
      {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - topToolBarHeight - 38 - 36;
      }
      else
      {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - topToolBarHeight - 38 - 36;
      }
    },
    /**
     * 如果isRefreshTree为true则重新刷新subLeftTree
     * @author   chenguang
     * @date     2018/11/27
     */
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.initTree();
      }
    }
  },
  mounted ()
  {
    this.initTree();
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
