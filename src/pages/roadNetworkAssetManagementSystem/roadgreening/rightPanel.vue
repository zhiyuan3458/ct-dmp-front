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
      <list v-if="isListShow"></list>
      <addEditDetail v-if="isAddEditShow"></addEditDetail>
    </div>
  </tree-right-panel>
</template>
<script type="text/ecmascript-6">
import index from './component/index';
import list from './component/list.vue';
import addEditDetail from './component/addEditDetail.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import roadGreening from '@/pages/roadNetworkAssetManagementSystem/roadgreening/store/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    treeRightPanel,
    index,
    list,
    addEditDetail
  },
  data ()
  {
    return {
      collapseObj: {
        width: 260,
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADGREENING', [
      'isListShow',
      'isAddEditShow'
    ])
  },
  created ()
  {
    this.$store.registerModule('roadNetworkAssetManagementSystem/_ROADGREENING', roadGreening);
  },
  destroyed ()
  {
    this.$store.unregisterModule('roadNetworkAssetManagementSystem/_ROADGREENING');
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
