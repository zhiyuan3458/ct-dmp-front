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
      <div slot="content" class="tab-container">
        <el-tabs  tabPosition="bottom" type="card">
          <el-tab-pane label="公路设施">
            <ul class="ztree" :id="treeId"></ul>
          </el-tab-pane>
          <el-tab-pane label="选择搜索">
            <el-form ref="ctform" size="mini" label-width="80px">
              <el-form-item label="公路设施">
                <el-select v-model="facility" placeholder="请选择公路设施">
                  <el-option label="隧道" value="tunnel"></el-option>
                  <el-option label="部门" value="dept"></el-option>
                  <el-option label="桥梁" value="bridge"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择组件">
                <el-input v-model="extraCondition"></el-input>
              </el-form-item>
              <el-form-item label="搜索条件">
                <el-input v-model="search"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
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
import { getFacilityInfo } from '@/api/common/common';
import prifix from '../../../common/js/urlPrifix';
import { getHttp } from '@/api/util.js';
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
      ctform: {},
      facility: '',
      extraCondition: '',
      search: '',
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
      ztreeList: []
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
        case 'dept': this.metaData.showDeptFrom = true; break;
        case 'tunnel': this.metaData.showTunnelFrom = true; break;
        case 'bridge': this.metaData.showBridgeFrom = true; break;
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
    /**
     * 根据类型获取相对应的信息
     * @author   gongjuncheng
     * @date     2019/3/18
     */
    getInfoByType (item)
    {
      var that = this;
      if (item.parentId !== 'root')
      {
        var url = null;
        var type = null;
        switch (item.type)
        {
          case 'dept': url = prifix.backstage; type = 'dept'; break;
          case 'tunnel': url = prifix.roadnetwork; type = 'tunnel'; break;
          case 'bridge': url = prifix.roadnetwork; type = 'bridge'; break;
          default : break;
        }
        getHttp(`${url}${item.actionUrl}`, {}).then(res =>
        {
          res.data.data.forEach((info, index) =>
          {
            if (info.coordinate !== undefined)
            {
              let mark = {
                extData: item.type,
                position: info.coordinate.split(','),
                events: {
                  click: () =>
                  {
                    let position = info.coordinate.split(',');
                    that.openPopup(position, info, type);
                  }
                },
                visible: true,
                draggable: false,
                content: '<div style="text-align:center; background-color: #F3FFF2; height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(259,100%,72%) 0px 0px 1px;" tip="' + info.text + '"><span style="font-size: 15px; color:#00008b" class="' + item.iconSkin + '"></span></div>'
              };
              that.metaData.markers.push(mark);
            }
          });
        });
      }
    },
    /**
     * 获取ztreeList信息
     * @author   gongjuncheng
     * @date     2019/3/18
     */
    getInfo ()
    {
      getFacilityInfo().then(({ data }) =>
      {
        data.data.ztreeList.forEach((item, index) =>
        {
          this.getInfoByType(item);
        });
        setTimeout(() =>
        {
          this.zTreeObj = new TreeTool(this.treeId, data.data.ztreeList, true);
          this.zTreeObj.setCheck();
          this.zTreeObj.setSelectedMulti();
          this.zTreeObj.setOnCheck(this.onCheck);
          this.zTreeObj.setChkboxType({Y: 's', N: 's'});
        }, 20);
      });
    },
    onCheck (event, treeId, treeNode)
    {
      let nodes = this.zTreeObj.getCheckedNodes();
      if (treeNode.text === '公路设施' && treeNode.checked)
      {
        for (let i = 0; i < nodes.length; i++)
        {
          if (nodes[i].checked && nodes[i].actionUrl)
          {
            this.getInfoByType(nodes[i]);
          }
        }
      }
      else if (treeNode.parentId !== 'root' && treeNode.checked)
      {
        this.getInfoByType(treeNode);
      }
      if (treeNode.text === '公路设施' && !treeNode.checked)
      {
        this.metaData.markers = [];
      }
      if (treeNode.parentId !== 'root' && !treeNode.checked)
      {
        const arr = this.metaData.markers.filter(item => item.extData !== treeNode.type);
        this.metaData.markers = arr;
      }
    }
  },
  created ()
  {
    this.metaData.amapManager = new VueAMap.AMapManager();
  },
  mounted ()
  {
    var that = this;
    that.getInfo();
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

<style lang="less" scoped>
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
  .tab-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position:absolute;
  }
  /deep/ .el-tabs {
    height: 100%;
    /deep/ .el-tabs__content {
      height: 94%;
    }
  }
  /deep/ .el-tabs__header {
    width: 100%;
    .el-tabs__nav {
      width: 100%;
      text-align: center;
    }
  }
  /deep/ .el-tabs__item{
    width: 50%!important;
  }
}
</style>
