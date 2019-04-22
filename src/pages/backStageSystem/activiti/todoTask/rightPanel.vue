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
import index from './component/index.vue';
import addEdit from './component/addEdit.vue';
import list from './component/list.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import todoTask from '@/pages/backStageSystem/activiti/todoTask/store/index';
export default {
  components: {
    treeRightPanel,
    index,
    addEdit,
    list
  },
  computed: {
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
    this.$store.registerModule('backStageSystem/_TODOTASK', todoTask);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_TODOTASK');
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
