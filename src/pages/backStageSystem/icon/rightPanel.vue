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
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import list from './component/list';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import icon from '@/pages/backStageSystem/icon/store/index';
export default {
  components: {
    treeRightPanel,
    index,
    list
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
    this.$store.registerModule('backStageSystem/_ICON', icon);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_ICON');
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
