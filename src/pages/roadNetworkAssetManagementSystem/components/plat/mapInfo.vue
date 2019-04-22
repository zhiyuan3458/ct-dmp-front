<template>
  <div class="chart-group">
    <el-amap
      :center="metaData.mapCenter" :amap-manager="metaData.amapManager" :adcode="metaData.adcode"
      :zoom="metaData.zoom" :features="metaData.features" :events="metaData.events"
      :defaultCursor="metaData.cursor" :plugin="metaData.plugin">
      <el-amap-marker
        v-for="(marker, index) in metaData.markers"
        :key="'mark-'+ index"
        :position="marker.position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :content="marker.content"
        :vid="'mark-'+ index">
      </el-amap-marker>
      <el-amap-info-window
        v-if="metaData.showAmapWindow"
        :position="metaData.popup.position"
        :visible="metaData.popup.visible"
        :content="metaData.popup.content"
        :events="metaData.popup.events">
      </el-amap-info-window>
    </el-amap>
    <div ref="mapForm">
      <bridge-map-form :bridgeInfo="metaData.dataInfo" v-if="metaData.showBridgeFrom"></bridge-map-form>
      <tunnel-map-form :bridgeInfo="metaData.dataInfo" v-if="metaData.showTunnelFrom"></tunnel-map-form>
      <dept-map-form :bridgeInfo="metaData.dataInfo" v-if="metaData.showDeptFrom"></dept-map-form>
    </div>
    <right-collapse-bar
      collapse-class="info-container"
    >
      <ul slot="content" class="ztree" :id="treeId"></ul>
    </right-collapse-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import VueAMap from 'vue-amap';
import bridgeMapForm from '@/pages/roadNetworkAssetManagementSystem/bridge/component/mapForm';
import tunnelMapForm from '@/pages/roadNetworkAssetManagementSystem/tunnel/component/mapForm';
import deptMapForm from '@/pages/backStageSystem/dept/component/mapForm';
import rightCollapseBar from '@/components/rightCollaspeBar';
import TreeTool from '@/class/ztreeTool/treeTool';
import { getBridgeInfo, getTunnelInfo, getDeptInfo } from '@/api/common/common';
export default {
  components: {
    bridgeMapForm,
    tunnelMapForm,
    deptMapForm,
    rightCollapseBar
  },
  data ()
  {
    return {
      metaData: {
        amapManager: {},
        mapCenter: [106.646851, 26.634859], // 地图中心点
        adcode: 520000, // 区划编码
        zoom: 10, // 地图显示的缩放级别
        plugin: [{
          pName: 'Geolocation',
          events: {
            init (o)
            {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) =>
              {
                if (result && result.position)
                {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }],
        cursor: 'default', // 鼠标样式
        features: ['road', 'bg'], // 'road'只显示道路
        events: {}, // 地图事件
        markers: [], // 标记点
        showAmapWindow: false, // 是否显示弹窗
        popup: {}, // 标记点弹窗
        dataInfo: null, // 地图表格中展示的桥梁信息
        dataTunnelInfo: null, // 地图表格中展示的隧道信息
        dataDeptInfo: null, // 地图表格中展示的部门信息
        showBridgeFrom: false,
        showTunnelForm: false,
        showDeptFrom: false
      },
      zTreeObj: {},
      treeId: 'rightTree',
      ztreeList: [{
        id: 1,
        text: '公路设施',
        checked: true,
        open: true,
        chkDisabled: false,
        iconSkin: 'ct-icon-department-blue',
        type: ''
      }, {
        id: 2,
        text: '部门',
        checked: true,
        open: true,
        chkDisabled: false,
        parentId: 1,
        iconSkin: 'ct-icon-home-blue',
        type: 'dept'
      }, {
        id: 3,
        text: '桥梁',
        checked: true,
        open: true,
        chkDisabled: false,
        parentId: 1,
        iconSkin: 'ct-icon-bridge1-blue',
        type: 'bridge'
      }, {
        id: 4,
        text: '隧道',
        checked: true,
        open: true,
        chkDisabled: false,
        parentId: 1,
        iconSkin: 'ct-icon-tunnel-light-green',
        type: 'tunnel'
      }]
    };
  },
  methods: {
    openPopup (row, item, type)
    {
      var that = this;
      this.metaData.showDeptFrom = false;
      this.metaData.showTunnelFrom = false;
      this.metaData.showBridgeFrom = false;
      switch (type)
      {
        case 'Dept': this.metaData.showDeptFrom = true; break;
        case 'Tunnel': this.metaData.showTunnelFrom = true; break;
        case 'Bridge': this.metaData.showBridgeFrom = true; break;
        default : break;
      }
      that.metaData.dataInfo = JSON.stringify(item);
      that.metaData.showAmapWindow = true;
      that.metaData.popup = {
        position: row,
        content: this.$refs.mapForm,
        visible: true,
        events: {
          close ()
          {
            that.metaData.showAmapWindow = false;
          }
        }
      };
    },
    getBridgeInfo ()
    {
      var that = this;
      getBridgeInfo().then(({ data }) =>
      {
        data.data.forEach((item, index) =>
        {
          if (item.coordinate !== undefined)
          {
            let mark = {
              position: item.coordinate.split(','),
              events: {
                click: () =>
                {
                  let position = item.coordinate.split(',');
                  that.openPopup(position, item, 'Bridge');
                }
              },
              visible: true,
              draggable: false,
              content: '<div style="text-align:center; background-color: #F3FFF2; height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;" tip="' + item.name + '"><span style="font-size: 15px; color:darkblue" class="ct-icon-bridge1-blue"></span></div>'
            };
            that.metaData.markers.push(mark);
          }
        });
      });
    },
    getTunnelInfo ()
    {
      var that = this;
      getTunnelInfo().then(({ data }) =>
      {
        data.data.forEach((item, index) =>
        {
          if (item.coordinate !== undefined)
          {
            let mark = {
              position: item.coordinate.split(','),
              events: {
                click: () =>
                {
                  let position = item.coordinate.split(',');
                  that.openPopup(position, item, 'Tunnel');
                }
              },
              visible: true,
              draggable: false,
              content: '<div style="text-align:center; background-color: #FDFEFC; height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(223,100%,59%) 0px 0px 1px;" tip="' + item.name + '"><span style="font-size: 15px; color:darkblue" class="ct-icon-tunnel-light-green"></span></div>'
            };
            that.metaData.markers.push(mark);
          }
        });
      });
    },
    getDeptInfo ()
    {
      var that = this;
      getDeptInfo().then(({ data }) =>
      {
        data.data.forEach((item, index) =>
        {
          if (item.coordinate !== undefined)
          {
            let mark = {
              position: item.coordinate.split(','),
              events: {
                click: () =>
                {
                  let position = item.coordinate.split(',');
                  that.openPopup(position, item, 'Dept');
                }
              },
              visible: true,
              draggable: false,
              content: '<div style="text-align:center; background-color: #F3FFF2; height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(259,100%,72%) 0px 0px 1px;" tip="' + item.name + '"><span style="font-size: 15px; color:#00008b" class="ct-icon-home-blue"></span></div>'
            };
            that.metaData.markers.push(mark);
          }
        });
      });
    },
    onCheck (event, treeId, treeNode)
    {
      this.metaData.markers = [];
      let nodes = this.zTreeObj.getCheckedNodes();
      for (let i = 0; i < nodes.length; i++)
      {
        switch (nodes[i].type)
        {
          case 'dept': this.getDeptInfo(); break;
          case 'tunnel': this.getTunnelInfo(); break;
          case 'bridge': this.getBridgeInfo(); break;
          default : break;
        }
      }
    }
  },
  created ()
  {
    this.getBridgeInfo();
    this.getTunnelInfo();
    this.getDeptInfo();
    this.metaData.amapManager = new VueAMap.AMapManager();
  },
  mounted ()
  {
    setTimeout(() =>
    {
      this.zTreeObj = new TreeTool(this.treeId, this.ztreeList, true);
      this.zTreeObj.setCheck();
      this.zTreeObj.setSelectedMulti();
      this.zTreeObj.setOnCheck(this.onCheck);
      this.zTreeObj.setChkboxType({Y: 's', N: 's'});
    }, 20);
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
      position: [106.646851, 26.634859],
      content: 'ct',
      visible: true,
      events: {
        close ()
        {
          that.metaData.showAmapWindow = false;
        }
      }
    };
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
.info-container {
  width: 260px;
  position: absolute!important;
  top: 0;
  right: -260px;
  height: 100%!important;
  padding: 0;
  background: white;
  border: 1px solid #ddd;
}
</style>
