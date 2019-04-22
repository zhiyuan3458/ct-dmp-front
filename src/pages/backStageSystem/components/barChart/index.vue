<template>
  <div class="chart-group">
    <grid-layout
      class="grid-layout-container"
      :layout="layout"
      :col-num="4"
      :row-height="gridItemHeight"
      :max-rows="maxRows"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[8, 8]"
      :use-css-transforms="true"
    >

      <grid-item v-for="item in layout" :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 dragIgnoreFrom=".content"
                 @resized="resizedEvent"
                 @moved="movedEvent"
      >
        <div class="chart-item" style="width: 100%; height: 100%;">
          <p>
            <span class="echart-icon ct-icon-dot-blue"></span>
            <span class="echart-title">{{item.title}}</span>
          </p>
          <div :id="item.id" class="content" style="width: 100%;"></div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import VueGridLayout from 'vue-grid-layout';
import { resizeChart, getEchartData, dragChart } from '@/api/backStageSystem';

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

export default {
  components: {
    GridLayout,
    GridItem
  },
  props: {
    echartsData: {
      type: Array,
      default ()
      {
        return [];
      }
    },
    gridLayoutHeight: {
      type: Number
    }
  },
  data ()
  {
    return {
      charts: [],
      layout: [],
      maxRows: 4
    };
  },
  computed: {
    /**
     * 计算出每个grid-item的高度
     * @author   lvzhiyuan
     * @date     2018/10/30
     */
    gridItemHeight ()
    {
      const gridLayoutMargin = 8 * this.maxRows;
      return (this.gridLayoutHeight - gridLayoutMargin) / 3;
    }
  },
  watch: {
    /**
     * 监听echartData，如果发生改变则触发修改layout并重新执行initChart渲染图表
     * @author   lvzhiyuan
     * @date     2018/10/30
     */
    echartsData (newVal)
    {
      this.layout = newVal.map(item =>
      {
        return {
          id: item.id,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i,
          title: item.title
        };
      });
      setTimeout(() =>
      {
        this.initChart();
      }, 20);
    }
  },
  created ()
  {
    this.echartsData.forEach(item =>
    {
      let obj = {
        id: item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        i: item.i,
        title: item.title
      };
      this.layout.push(obj);
    });
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
      this.echartsData.forEach(async (item, index) =>
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
          chartContainer = document.getElementById(item.id);
          let chart = this.$echarts.init(document.getElementById(item.id));
          chart.setOption(option);
          chart.showLoading({
            animation: false,
            text: '拼命加载中...',
            textStyle: { fontSize: 25 }
          });
          let { data } = await getEchartData(item.url);
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
          this.charts.push(chart);
          window.addEventListener('resize', function ()
          {
            let chartId = document.getElementById(item.id);
            let width = chartId.offsetWidth;
            let height = chartId.offsetHeight;
            chart.resize({
              width,
              height
            });
          }, false);
        }
        catch (e)
        {
          this.$echarts.init(chartContainer).hideLoading();
          chartContainer.style.textAlign = 'center';
          chartContainer.style.marginTop = '10px';
          chartContainer.innerHTML = '暂无数据';
          console.log('error: ' + e);
        }
      });
    },
    /**
     * 调整echart图表的大小时触发
     * @param i——echart的id
     * @param newH——echart调整后新的高度比例
     * @param newW——echart调整后新的宽度比例
     * @param newHPx——echart调整后新的高度
     * @param newWPx——echart调整后新的宽度
     */
    resizedEvent (i, newH, newW, newHPx, newWPx)
    {
      let obj = {
        id: i,
        w: newW,
        h: newH
      };
      resizeChart(obj).then(res =>
      {
        console.log('i');
        console.log(this.charts.find(chart => chart._dom.id === i));
        // 4081a89466a92d6c0166a930a9070004
        this.charts.find(chart => chart._dom.id === i).resize({
          width: newWPx,
          height: newHPx - 26
        });
        console.log('newW');
        console.log(newWPx);
        console.log('newH');
        console.log(newHPx);
      }, err =>
      {
        console.log('err: ' + JSON.stringify(err));
      });
    },
    /**
     * 调整echart图表的位置时触发
     * @author   lvzhiyuan
     * @date     2018/10/30
     * @param    i——echart的id
     * @param    newX——echart调整后新的x位置（水平位置）
     * @param    newY——echart调整后新的y位置（垂直位置）
     */
    movedEvent (i, newX, newY)
    {
      let obj = {
        id: i,
        x: newX,
        y: newY
      };
      dragChart(obj).then(res =>
      {
      }, err =>
      {
        console.log('err: ' + JSON.stringify(err));
      });
    }
  }
};
</script>

<style lang="less">
.chart-group {
  height: 100%;
  overflow: auto!important;
  .grid-layout-container {
    height: 100%!important;
  }
}
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
