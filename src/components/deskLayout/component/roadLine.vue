<template>
  <div class="chart-group">
    <el-amap
      :center="metaData.mapCenter" :amap-manager="metaData.amapManager"
      :zoom="metaData.zoom" :features="metaData.features" :events="metaData.events"
      :defaultCursor="metaData.cursor" :plugin="metaData.plugin">

      <div v-for="(item, i) in paths" :key="i">
        <el-amap-polyline :editable="false" :path="item.path" :strokeColor="item.color" strokeWeight="10" lineJoin="round" :extData="item.id" bubble="true">
        </el-amap-polyline>
      </div>
      <el-amap-info-window
        v-if="metaData.showAmapWindow"
        :position="metaData.popup.position"
        :visible="metaData.popup.visible"
        :content="metaData.popup.content"
        :events="metaData.popup.events">
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script type="text/ecmascript-6">
import VueAMap from 'vue-amap';
export default {
  data ()
  {
    return {
      metaData: {
        amapManager: {},
        mapCenter: [113.258089, 23.045244], // 地图中心点
        zoom: 12, // 地图显示的缩放级别
        plugin: [], // 插件
        cursor: 'default', // 鼠标样式
        features: 'road', // 'road'只显示道路
        events: {}, // 地图事件
        markers: [], // 标记点
        showAmapWindow: false, // 是否显示弹窗
        popup: {}, // 标记点弹窗
        mapBridgeInfo: null // 地图表格中展示的桥梁信息
      },
      paths: [
        { path: [[113.286092, 22.984513], [113.285062, 22.977639]], color: '#3366FF', id: 1 },
        { path: [[113.285062, 22.977639], [113.284289, 22.97349]], color: '#3366FF', id: 2 },
        { path: [[113.284289, 22.97349], [113.283474, 22.969262]], color: '#3366FF', id: 3 },
        { path: [[113.256287, 23.049607], [113.258089, 23.045244]], color: '#3366FF', id: 4 },
        { path: [[113.258089, 23.045244], [113.259785, 23.041236]], color: '#3366FF', id: 5 },
        { path: [[113.259785, 23.041236], [113.260836, 23.038866]], color: '#000000', id: 6 },
        { path: [[113.260836, 23.038866], [113.261823, 23.036575]], color: '#000000', id: 7 },
        { path: [[113.261823, 23.036575], [113.263347, 23.033613]], color: '#000000', id: 8 },
        { path: [[113.263347, 23.033613], [113.265879, 23.030888]], color: '#000000', id: 9 },
        { path: [[113.265879, 23.030888], [113.270213, 23.026939]], color: '#000000', id: 10 },
        { path: [[113.270213, 23.026939], [113.275148, 23.022239]], color: '#000000', id: 11 }
      ]
    };
  },
  created ()
  {
    this.metaData.amapManager = new VueAMap.AMapManager();
  },
  mounted ()
  {
    var that = this;
    that.metaData.plugin = [
      {
        pName: 'ToolBar'
      }
    ];
    // 是否显示弹窗
    that.metaData.showAmapWindow = false;
    // 弹窗初始化
    that.metaData.popup = {
      position: [113.30064, 23.049568],
      content: 'ct',
      visible: true,
      events: {
        close ()
        {
          that.metaData.showAmapWindow = false;
        }
      }
    };
    that.metaData.events = {
      // 鼠标移动时触发
      'mousemove': (e) =>
      {
        // 判断点线关系
        var pos = [e.lnglat.lng, e.lnglat.lat];
        // mp = getResolution() 获取指定位置的地图分辨率，单位：米/像素
        let mp = this.metaData.amapManager.getMap().getResolution();
        // m 为Polyline宽度的米数
        var m = 5 * mp;
        // 判断 marker 是否在线段上，最后一个参数为 m米 的误差
        for (let i = 0; i < this.paths.length; i++)
        {
          var inLine = AMap.GeometryUtil.isPointOnSegment(pos, this.paths[i].path[0], this.paths[i].path[1], m);
          if (inLine)
          {
            let content = '开始端点是：' + this.paths[i].path[0] + ' 结束端点是：' + this.paths[i].path[1];
            that.metaData.popup = {
              position: pos,
              content: content,
              visible: true,
              events: {
                close ()
                {
                  that.metaData.showAmapWindow = false;
                }
              }
            };
            that.metaData.showAmapWindow = true;
            break;
          }
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.chart-group {
  height: 100%;
  overflow: auto!important;
  /deep/ .grid-layout-container {
    height: 100%!important;
  }
}
</style>
