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
      <list></list>
      <addEdit></addEdit>
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import list from './component/list.vue';
import addEdit from './component/addEdit.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import cascademanagement from '@/pages/backStageSystem/cascademanagement/store/index';
export default {
  components: {
    treeRightPanel,
    index,
    list,
    addEdit
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
    this.$store.registerModule('backStageSystem/_CASCADEMANAGEMENT', cascademanagement);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_CASCADEMANAGEMENT');
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
<style lang="less" scoped>
.right-panel {
  height: 100%;
}
</style>
