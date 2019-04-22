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
          <!--<iframe src="../plat/mapChart.vue" id="itme.id" class="content" style="width: 100%;"></iframe>-->
          <index class="content" :ref="'char' + item.i" style="width: 100%;" :type="item.type" :charId="'char' + item.i" :url="item.url"></index>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import VueGridLayout from 'vue-grid-layout';
import { resizeChart, dragChart } from '@/api/backStageSystem';
import index from './component/index';

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

export default {
  components: {
    GridLayout,
    GridItem,
    index
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
      maxRows: 4,
      width: '',
      height: ''
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
          title: item.title,
          type: item.type,
          url: item.url
        };
      });
      setTimeout(() =>
      {
        // this.initChart();
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
        title: item.title,
        type: item.type,
        url: item.url
      };
      this.layout.push(obj);
    });
  },
  mounted ()
  {
    setTimeout(() =>
    {
      // this.initChart();
    }, 20);
  },
  methods: {
    resizedEvent (i, newH, newW, newHPx, newWPx)
    {
      let obj = {
        id: i,
        w: newW,
        h: newH
      };
      resizeChart(obj).then(res =>
      {
        if (this.$refs[`char${i}`][0].$children[0].chart)
        {
          this.$refs[`char${i}`][0].$children[0].chart.resize({
            width: newWPx,
            height: newHPx - 26
          });
        }
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

<style lang="less" scoped>
.chart-group {
  height: 100%;
  position: relative;
  overflow: auto!important;
  overflow-x: hidden!important;
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
    position: relative;
    border-radius: 5px 5px 0 0;
    border: #ccc 1px solid;
    height: 350px;
    float: left;
    .content {
      overflow-x: hidden!important;
    }

    .info-container {
      width: 20%;
      height: calc(100% - 300px);
      background: white;
      position: absolute;
      top: 25px;
      right: 0;
      z-index: 10;
      border: 1px solid #ddd;
      box-shadow: -5px 5px 5px #eee;
      overflow: auto;
    }
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
