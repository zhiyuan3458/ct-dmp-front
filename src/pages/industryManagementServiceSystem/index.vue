<template>
  <div class="setting" ref="setting">
    <bar-chart :gridLayoutHeight="gridLayoutHeight" :echartsData="echarts" v-if="echarts.length !== 0">
    </bar-chart>
  </div>
</template>

<script>
import barChart from '@/pages/backStageSystem/components/barChart';
import { mapGetters } from 'vuex';

export default {
  components: {
    barChart
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
