<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="80px">
      <el-form-item label="管理单位">
        <ztree-select
          width="200px"
          v-model="deptId"
          :ztreeList="ztreeList"
          :readOnly="false"
        ></ztree-select>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="year"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <!--<div class="chart-item" style="width: 100%; height: 100%;">
      <p>
        <span class="echart-icon ct-icon-dot-blue"></span>
        <span class="echart-title">测试</span>
      </p>
      <div id="echartsId" class="content" style="width: 100%;"></div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
import { getEchartData } from '@/api/backStageSystem';
export default {
  components: {
    ztreeSelect
  },
  data ()
  {
    return {
      deptId: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      ztreeList: []
    };
  },
  methods: {
    /**
     * 查询提交
     * @author   chenguang
     * @date     2019/1/24
     */
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {deptId: this.deptId, year: this.year};
      if (this.year === '' || this.year === null)
      {
        delete formCondition[`year`];
      }
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/showList', formCondition);
    },
    /**
     * 初始化select树数据
     * @author   chenguang
     * @date     2019/1/24
     */
    initSelectTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/getTree').then(data =>
      {
        this.deptId = data.deptId;
        this.ztreeList = data.ztreeList;
      });
    },
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
              }
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
        chartContainer = document.getElementById('echartsId');
        let chart = this.$echarts.init(document.getElementById('echartsId'));
        chart.setOption(option);
        chart.showLoading({
          animation: false,
          text: '拼命加载中...',
          textStyle: { fontSize: 25 }
        });
        getEchartData('/sys/bs/desk/getEchartsData').then(res =>
        {
          chart.hideLoading();
          // data.data.xaxis
          chart.setOption({
            xAxis: {
              data: res.data.data.xaxis
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
                  }},
                data: res.data.data.yaxis
              }
            ]
          });
          window.addEventListener('resize', function ()
          {
            let chartId = document.getElementById('echartsId');
            let width = chartId.offsetWidth;
            let height = chartId.offsetHeight;
            chart.resize({width, height
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
  },
  mounted ()
  {
    /**
     * 初始化树
     * @param newValue
     * @param oldValue
     */
    this.initSelectTree();
    setTimeout(() =>
    {
      // this.initChart();
    }, 20);
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
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
    height: 200px;
  }
}
</style>
