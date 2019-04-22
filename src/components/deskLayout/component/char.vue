<template>
  <div :id="charId" class="content" style="width: 100%;"></div>
</template>

<script type="text/ecmascript-6">
import VueGridLayout from 'vue-grid-layout';
import {getEchartData} from '@/api/backStageSystem';

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

export default {
  components: {
    GridLayout,
    GridItem
  },
  props: {
    charId: {
      type: String,
      request: true
    },
    url: {
      type: String
    }
  },
  data ()
  {
    return {
      chart: null,
      charts: [],
      layout: [],
      maxRows: 4
    };
  },
  computed: {
  },
  mounted ()
  {
    setTimeout(() =>
    {
      this.initChart();
    }, 20);
  },
  methods: {
    /**
     * 初始化echart图表
     * @author   lvzhiyuan
     * @date     2018/10/30
     */
    initChart ()
    {
      let chartContainer;
      try
      {
        let option = {
          title: {
            x: 26,
            // text: '基础数据数量',
            textStyle: {
              fontSize: 14,
              color: '#999'
            }
          },
          grid: {
            bottom: 8
          },
          tooltip: {
            trigger: 'axis',
            position: [10, 10]
          },
          legend: {
            x: 130,
            data: ['bar']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {show: true, type: ['line', 'bar']}
            }
          },
          calculable: true,
          xAxis: {
            data: [],
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#333'
              },
              interval: 0,
              rotate: 40
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ]
        };
        chartContainer = document.getElementById(this.charId);
        let chart = this.$echarts.init(document.getElementById(this.charId));
        this.chart = chart;
        chart.setOption(option);
        chart.showLoading({
          animation: false,
          text: '拼命加载中...',
          textStyle: { fontSize: 25 }
        });
        getEchartData(this.url).then(res =>
        {
          let { data } = res;
          chart.hideLoading();
          // data.data.xaxis
          chart.setOption({
            xAxis: {
              data: data.data.xaxis
            },
            series: [
              { // For shadow
                type: 'bar',
                itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                animation: false
              },
              {
                name: 'bar',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                      ]
                    )
                  },
                  emphasis: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                    )
                  }
                },
                data: data.data.yaxis
              }
            ]
          });
          window.addEventListener('resize', function ()
          {
            let chartId = document.getElementById(this.charId);
            let width = chartId.offsetWidth;
            let height = chartId.offsetHeight;
            chart.resize({
              width,
              height
            });
          }, false);
        });
      }
      catch (e)
      {
        this.$echarts.init(chartContainer).hideLoading();
        chartContainer.style.textAlign = 'center';
        chartContainer.style.marginTop = '10px';
        chartContainer.innerHTML = '暂无数据';
        console.log('error: ' + e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.twiceChart {
  width: 98%;
}
.chart {
  width: 48%;
}
  .chart-item {
    border-radius: 5px 5px 0 0;
    border: #ccc 1px solid;
    height: 350px;
    float: left;

    .echart-icon:before {
      color: orangered!important;
    }

    .echart-title {
      font-family: '微软雅黑';
      font-size: 12px;
    }

    p {
      height: 25px;
      line-height: 25px;
      border-radius: 5px 5px 0 0;
      border-bottom: #ddd 1px solid;
      color: #56a2e8;
      font-family: "微软雅黑";
      padding-left: 13px;
    }

    .content {
      height: calc(100% - 25px);
    }
  }
</style>
