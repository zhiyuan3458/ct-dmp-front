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
     * 初始化或更新subLeftTree树
     * @author   yekuncai
     * @date     2018/10/22
     */
    initTree ()
    {
      let level = 3;
      this.$store.dispatch('backStageSystem/_PERMISSION/getRoleTree').then(data =>
      {
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList, false);
        this.metaData.treeTool.setOnClick(this.clickFn);
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
     * @date     2018/10/18
     */
    clickFn (event, treeId, treeNode)
    {
      if (treeNode.type !== 'Role')
      {
        this.$message(`${treeNode.text}节点不是角色节点,无法操作`);
      }
      else
      {
        this.$store.dispatch('backStageSystem/_PERMISSION/getTree', {roleId: treeNode.id});
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PERMISSION', [
      'sideBar'
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
