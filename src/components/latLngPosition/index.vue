<template>
  <div class="lat-lng-position-container">
    <el-input class="form-input" v-model="value" :readonly="true"></el-input>
    <span class="ct-icon-location-dark-orange" @click="openDialog"></span>
    <custom-dialog title="坐标定位" :visible.sync="showDialog" icon="ct-icon-location-dark-orange" isHidden>
      <div class="locate-map">
        <div>
          <el-form :inline="true" class="form-inline">
            <el-form-item label="经度">
              <el-input v-model="Lng" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="Lat" :readonly="true"></el-input>
            </el-form-item>
            <el-button v-if="!readonly" type="primary" @click="handleChange" size="small">确认</el-button>
          </el-form>
        </div>
        <el-amap vid="locateDemo" :zoom="zoom" :events="events" :center="mapCenter">
          <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :vid="index"></el-amap-marker>
        </el-amap>
      </div>
    </custom-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 坐标定位组件
 * @author   chenguang
 * @date     2018/12/26
 */
import customDialog from '@/components/dialog';
export default {
  components: {
    customDialog
  },
  data ()
  {
    let defaultMapCenter = [113.307486, 23.057851];
    return {
      defaultMapCenter,
      mapCenter: this.value ? this.value.split(',') : defaultMapCenter,
      zoom: 12,
      Lng: 0, // 经度
      Lat: 0, // 纬度
      events: {
        'click': (e) =>
        {
          let x = e.lnglat.getLng();
          let y = e.lnglat.getLat();
          this.mapCenter = [x, y];
          let marker = {position: this.mapCenter};
          this.markers[0] = marker;
          this.Lng = x;
          this.Lat = y;
        }
      },
      markers: [], // 标记点
      popup: null,
      showDialog: false
    };
  },
  props: {
    value: {
      required: true,
      default: ''
    },
    readonly: {
      required: true,
      default: true
    }
  },
  watch: {
    value (newVal, oldVal)
    {
      this.mapCenter = this.value ? this.value.split(',') : this.defaultMapCenter;
    },
    mapCenter:
      {
        handler (newValue, oldValue)
        {
          let marker = {position: newValue};
          this.markers[0] = marker;
          this.Lng = newValue[0];
          this.Lat = newValue[1];
        },
        immediate: true
      },
    showDialog (newVal, oldVal)
    {
      if (!newVal)
      {
        this.reset();
      }
    }
  },
  methods: {
    /**
     * 打开地图弹窗
     * @author   chenguang
     * @date     2018/12/26
     */
    openDialog ()
    {
      this.showDialog = true;
    },
    /**
     * 重置地图坐标
     * @author   chenguang
     * @date     2019/1/22
     */
    reset ()
    {
      this.mapCenter = this.value.split(',');
    },
    /**
     * 传值至前台
     * @author   chenguang
     * @date     2018/12/26
     */
    handleChange ()
    {
      this.$emit('input', `${this.Lng},${this.Lat}`);
      this.showDialog = false;
    }
  }
};
</script>

<style lang="less" scoped>
  .locate-map {
    height: 100%;
  }
  .ct-icon-location-dark-orange {
    position: absolute;
    top: 2px;
    right: 4px;
    cursor: pointer;
  }
  .form-inline {
    .el-button--small {
      margin-top: 3px;
    }
  }
</style>
