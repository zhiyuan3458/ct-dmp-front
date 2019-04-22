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
import list from './component/list.vue';
import addEdit from './component/addEdit.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import roadstandard from '@/pages/roadNetworkAssetManagementSystem/roadstandard/store/index';
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
        width: 260,
        draggable: true,
        collapsable: true
      },
      treeLevel: [],
      treeObj: {}
    };
  },
  computed:
    {
      ...mapGetters('roadNetworkAssetManagementSystem/_ROADSTANDARD', [
        'isAddEditShow',
        'isListShow'
      ])
    },
  created ()
  {
    this.$store.registerModule('roadNetworkAssetManagementSystem/_ROADSTANDARD', roadstandard);
  },
  destroyed ()
  {
    this.$store.unregisterModule('roadNetworkAssetManagementSystem/_ROADSTANDARD');
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
