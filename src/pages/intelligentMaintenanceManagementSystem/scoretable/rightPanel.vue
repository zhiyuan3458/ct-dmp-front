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
      <tree-right-panel
        :collapseObj="collapseObj"
        :treeLevel="treeLevel"
        :treeObj="treeObj"
        :topShow="true"
        v-if="isExtensionShow"
      >
        <div slot="tree">
          <rightTree @getLevel="getLevel"></rightTree>
        </div>
        <div class="right-panel" slot="right-content">
          <addEditDetail v-if="isAddEditDetailShow"></addEditDetail>
        </div>
      </tree-right-panel>
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import list from './component/list.vue';
import addEdit from './component/addEdit.vue';
import addEditDetail from './component/addEditDetail.vue';
import rightTree from './component/rightTree.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import scoretable from '@/pages/intelligentMaintenanceManagementSystem/scoretable/store/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    treeRightPanel,
    index,
    list,
    addEdit,
    rightTree,
    addEditDetail
  },
  data ()
  {
    return {
      collapseObj: {
        width: 290,
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SCORETABLE', [
      'isListShow',
      'isAddEditShow',
      'isExtensionShow',
      'isAddEditDetailShow'
    ])
  },
  created ()
  {
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_SCORETABLE', scoretable);
  },
  destroyed ()
  {
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_SCORETABLE');
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
