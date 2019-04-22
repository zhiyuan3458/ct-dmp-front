 <template>
    <tree-right-panel
      :collapseObj="collapseObj"
      :treeLevel="treeLevel"
      :treeObj="treeObj"
      :topShow="false"
    >
      <div slot="tree">
        <index @getLevel="getLevel"></index>
        <el-scrollbar :native = true><list v-if="isListShow"></list></el-scrollbar>
      </div>
      <div class="right-panel" slot="right-content">
        <addEdit v-if="isAddEditShow"></addEdit>
      </div>
    </tree-right-panel>
  </template>
<script type="text/ecmascript-6">
import index from './component/index';
import list from './component/list.vue';
import addEdit from './component/addEdit.vue';
import treeRightPanel from '@/components/rightPanel/treeRightPanel';
import sandstonedamage from '@/pages/intelligentMaintenanceManagementSystem/sandstonedamage/store/index';
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
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE', [
      'isListShow',
      'isAddEditShow'
    ])
  },
  created ()
  {
    this.$store.registerModule('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE', sandstonedamage);
  },
  destroyed ()
  {
    this.$store.unregisterModule('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE');
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
