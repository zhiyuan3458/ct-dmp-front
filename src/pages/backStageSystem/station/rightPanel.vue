<template>
  <div class="right-panel" slot="right-content">
    <addEdit></addEdit>
  </div>
</template>
<script type="text/ecmascript-6">
import addEdit from './component/addEdit.vue';
import station from '@/pages/backStageSystem/station/store/index';
export default {
  components: {
    addEdit
  },
  created ()
  {
    this.$store.registerModule('backStageSystem/_STATION', station);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_STATION');
  }
};
</script>
<style lang="less" scoped>
  .right-panel {
    height: 100%;
  }
</style>
