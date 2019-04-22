<template>
  <tree-right-panel
    :collapseObj="collapseObj"
    :treeLevel="treeLevel"
    :treeObj="treeObj"
    :topShow="false"
  >
    <div slot="tree">
      <index @getLevel="getLevel"></index>
    </div>
    <div class="right-panel" slot="right-content">
      <list v-if="isListShow"></list>
      <addEdit v-if="isAddEditShow"></addEdit>
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import addEdit from './component/addEdit';
import list from './component/list';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import tunnelregularcheck from '@/pages/intelligentMaintenanceManagementSystem/tunnelregularcheck/store/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    treeRightPanel,
    index,
    addEdit,
    list
  },
  data ()
  {
    return {
      collapseObj: {
        width: 309,
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK', [
      'isAddEditShow',
      'isListShow'
    ])
  },
  created ()
  {
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK', tunnelregularcheck);
  },
  destroyed ()
  {
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK');
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
