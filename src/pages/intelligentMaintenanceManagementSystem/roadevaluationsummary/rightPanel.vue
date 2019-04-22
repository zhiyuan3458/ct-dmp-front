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
import addEdit from './component/addEdit.vue';
import list from './component/list';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import roadevaluationsummary from '@/pages/intelligentMaintenanceManagementSystem/roadevaluationsummary/store/index';
import { mapGetters } from 'vuex';
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
        width: 280,
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY', [
      'isListShow',
      'isAddEditShow'
    ])
  },
  created ()
  {
    // BRIDGEOFTENCHECK这个是动态注册的标识符,保持唯一性，用于store
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY', roadevaluationsummary);
  },
  destroyed ()
  {
    // 动态销毁
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY');
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
