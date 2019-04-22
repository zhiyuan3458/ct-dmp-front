<template>
  <div class="rightPanel">
    <list></list>
    <addEdit></addEdit>
  </div>
</template>
<script type="text/ecmascript-6">
import addEdit from './component/addEdit.vue';
import list from './component/list.vue';
import search from '@/pages/backStageSystem/search/store/index';
export default {
  components: {
    addEdit,
    list
  },
  created ()
  {
    this.$store.registerModule('backStageSystem/_SEARCH', search);
  },
  destroyed ()
  {
    this.$store.unregisterModule('backStageSystem/_SEARCH');
  }
};
</script>
<style lang="less">
  .rightPanel {
    height: 100%;
  }
</style>
