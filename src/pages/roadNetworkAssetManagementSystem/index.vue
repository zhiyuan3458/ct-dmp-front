<template>
  <div class="setting" ref="setting">
    <desk-layout :gridLayoutHeight="gridLayoutHeight" :echartsData="echarts" v-if="echarts.length !== 0"></desk-layout>
  </div>
</template>

<script>
import deskLayout from '@/components/deskLayout/index';
import { mapGetters } from 'vuex';

export default {
  components: {
    deskLayout
  },
  data ()
  {
    return {
      gridLayoutHeight: 0,
      echarts: []
    };
  },

  computed: {
    ...mapGetters([
      'currentSubsystemId',
      'initEcharts'
    ])
  },

  watch: {
    initEcharts ()
    {
      this.echarts = this.initEcharts.filter(initEchart => initEchart.isTarget === '1');
    }
  },
  created ()
  {
    this.$store.dispatch('getDeskSetting', sessionStorage.getItem('currentSubsystemId'));
    this.$nextTick(() =>
    {
      this.gridLayoutHeight = this.$refs.setting.offsetHeight;
    });
  }
};
</script>

<style scoped lang="less">
  .setting {
    height: 100%;
  }
</style>
