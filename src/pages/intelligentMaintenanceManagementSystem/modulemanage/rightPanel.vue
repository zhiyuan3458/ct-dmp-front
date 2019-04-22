<template>
  <tree-right-panel
    :collapseObj="collapseObj"
    :treeLevel="treeLevel"
    :treeObj="treeObj"
  >
    <div slot="tree">
      <index @getLevel="getLevel"></index>
    </div>
    <div class="right-panel" slot="right-content">
      <addEdit></addEdit>
      <addEditDetail></addEditDetail>
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import addEdit from './component/addEdit';
import addEditDetail from './component/addEditDetail';
import moduleManage from './store/index';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
export default {
  components: {
    treeRightPanel,
    index,
    addEdit,
    addEditDetail
  },
  data ()
  {
    return {
      collapseObj: {
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  created ()
  {
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_MODULEMANAGE', moduleManage);
  },
  destroyed ()
  {
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_MODULEMANAGE');
  },
  methods: {
    /* 获取树的层级传递给treeRightPanel */
    getLevel (tree)
    {
      this.treeObj = tree.treeObj;
      this.treeLevel = tree.treeLevel;
    }
  }
};
</script>
<style lang="less">
.right-panel {
  height: 100%;
}
</style>
