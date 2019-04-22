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
      <addEdit v-if="isAddEditShow"></addEdit>
    </div>
  </tree-right-panel>
</template>

<script>
import index from './component/index';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import addEdit from './component/addEdit';
import scrollPanel from '@/components/scrollPane/scrollPane';
import roadbedDamageCheck from '@/pages/intelligentMaintenanceManagementSystem/roadbeddamagecheck/store/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    index,
    treeRightPanel,
    addEdit,
    scrollPanel
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
      treeObj: {},
      metaData: {
        dialogVisible: false,
        readOnly: true
      }
    };
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK', [
      'isAddEditShow'
    ])
  },
  created ()
  {
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK', roadbedDamageCheck);
  },
  destroyed ()
  {
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK');
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

<style lang = "less" scoped>
  .right-panel {
    height: 100%;
  }
</style>
