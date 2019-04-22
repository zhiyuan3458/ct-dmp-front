<template>
  <div class="lzy-table-wrapper" v-if="isListShow" v-loading="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="permission-tree-container">
      <tree-collapse-bar
        class="collapse-bar"
        :collapsedWrapper="style.collapsedWrapper"
        :treeObj="metaData.treeTool"
        treeId="permissionTree"
      >
        <!-- 树形结构工具栏 -->
        <ul slot="tree" id="permissionTree" class="ztree"></ul>
      </tree-collapse-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author lvzhiyuan
 * @date   2018/6/1
 */
import { mapGetters } from 'vuex';
import treeCollapseBar from '@/components/treeCollapseBar';
import TreeTool from '@/class/ztreeTool/treeTool';
import rightNavLayout from '@/components/topToolBar';
export default {
  components: {
    treeCollapseBar,
    rightNavLayout
  },
  data ()
  {
    return {
      style: {
        isShow: false,
        collapsedWrapper: {
          width: 270, // 设置初始宽度
          draggable: false, // 是否可拖拽
          collapsable: false // 是否可伸缩
        }
      },
      metaData: {
        treeTool: null
      }
    };
  },
  methods: {
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
     * 保存
     * @author   chenguang
     * @date     2018/10/19
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.isLoading = true;
        let nodes = this.metaData.treeTool.getCheckedNodes();
        let arr = nodes.map(node =>
        {
          let temp = node.actionUrl === '' ? node.type : node.actionUrl;
          return `${node.id},${temp}`;
        });
        arr = arr.join(';');
        this.$store.dispatch('backStageSystem/_PERMISSION/save', { roleId: this.roleId, permitStr: arr });
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PERMISSION', [
      'sideBar',
      'permissionTreeList',
      'isListShow',
      'roleId',
      'operateBtns',
      'navigateMenus',
      'isLoading'
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
    permissionTreeList (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.treeTool = new TreeTool('permissionTree', this.permissionTreeList, true);
          this.metaData.treeTool.setCheck();
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../common/less/common";
.permission-tree-container {
  height: calc(100% - 62px);
}
</style>
