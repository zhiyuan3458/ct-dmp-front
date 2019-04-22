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
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import addEdit from './component/addEdit';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import extension from '@/pages/backStageSystem/activiti/extension/store/index';
export default {
  components: {
    treeRightPanel,
    index,
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
    this.$store.registerModule('backStageSystem/_EXTENDSION', extension);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_EXTENDSION');
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
