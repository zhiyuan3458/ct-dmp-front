<template>
  <div class="right-panel" slot="right-content">
    <list></list>
    <addEdit></addEdit>
  </div>
</template>
<script type="text/ecmascript-6">
import list from './component/list.vue';
import addEdit from './component/addEdit';
import leave from '@/pages/backStageSystem/leave/store/index';
export default {
  components: {
    list,
    addEdit
  },
  created ()
  {
    this.$store.registerModule('backStageSystem/_LEAVE', leave);
  },
  destroyed ()
  {
    this.$store.dispatch('setBusinessId', '');
    this.$store.unregisterModule('backStageSystem/_LEAVE');
  }
};
</script>
<style lang="less" scoped>
.right-panel {
  height: 100%;
}
</style>
