<template>
  <div class="lzy-table-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="gridEntityInfo"
      :tableBtns="tableBtns"
      :listGridColumnInfo="listGridColumnInfo"
      :isLoading="isLoading"
    ></custom-table>
    <custom-dialog title="地图定位" icon="ct-icon-location-dark-orange" :visible.sync="metaData.dialogVisible" isHidden>
      <div class="amap-demo">
        <el-amap vid="amapDemo" :zoom="metaData.zoom" :center="metaData.mapCenter">
          <el-amap-marker v-for="(marker, index) in metaData.markers" :key="index" :position="marker.position" :events="marker.events" :vid="index"></el-amap-marker>
          <el-amap-info-window
            v-if="metaData.showAmapWindow"
            :position="metaData.popup.position"
            :visible="metaData.popup.visible"
            :content="metaData.popup.content"
            :events="metaData.popup.events">
          </el-amap-info-window>
        </el-amap>
      </div>
    </custom-dialog>
    <div ref="mapForm">
      <bridge-map-form :bridgeInfo="metaData.mapBridgeInfo"></bridge-map-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
import customDialog from '@/components/dialog';
import bridgeMapForm from './mapForm';
export default {
  components: {
    rightNavLayout,
    customTable,
    customDialog,
    bridgeMapForm
  },
  data ()
  {
    return {
      metaData: {
        dialogVisible: false,
        currentPage: 1,
        pageSize: 50,
        search: null,
        multipleSelection: [], // 表格复选框选中后的数据
        mapCenter: [113.307486, 23.057851],
        zoom: 12,
        markers: [], // 标记点
        showAmapWindow: false,
        popup: null, // 标记点弹窗
        position: [],
        mapBridgeInfo: null // 地图表格中展示的桥梁信息
      }
    };
  },
  methods: {
    /**
     * 添加
     * @author   chenguang
     * @date     2018/11/16
     */
    addFn ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/add', {belongDeptId: this.deptId});
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/show', {id: row.id, route: this.$route.path});
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/edit', {id: row.id, deptId: this.deptId, userId: row.id, route: this.$route.path});
    },
    /**
     * 删除
     * @author   chenguang
     * @date     2018/11/16
     */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let bridgeIds = '';
        for (let row of this.multipleSelection)
        {
          bridgeIds += row.id + ',';
        }
        bridgeIds = bridgeIds.substring(0, bridgeIds.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/remove', {id: bridgeIds}).then(() =>
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.metaData.currentPage = 1;
            this.metaData.pageSize = 50;
            this.getTableData();
          });
        });
      }
      else
      {
        this.$message('请选中一行或多行!');
      }
    },
    /**
     * 定位
     * @author   chenguang
     * @date     2018/12/25
     */
    gisLocationFn (row)
    {
      this.metaData.dialogVisible = true;
      this.metaData.mapBridgeInfo = JSON.stringify(row);
      this.openPopup(row);
    },
    /**
     * 表格数据初始化
     * @author   chenguang
     * @date     2018/12/25
     */
    getTableData ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/listJson', {
        deptId: this.deptId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    /**
     * 复选框选定
     * @author   chenguang
     * @date     2018/11/16
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   chenguang
     * @date     2018/11/16
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 表格页码跳转
     * @author   chenguang
     * @date     2018/11/16
     */
    handleCurrentChange (currentPage)
    {
      this.metaData.currentPage = currentPage;
      this.getTableData();
    },
    /**
     * 模糊查询
     * @author   chenguang
     * @date     2018/12/05
     */
    searchFn (search)
    {
      if (search === '')
      {
        this.metaData.search = null;
      }
      else
      {
        this.metaData.search = search;
      }
      this.metaData.currentPage = 1;
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/listJson', {
        deptId: this.deptId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_BRIDGE', [
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'deptId',
      'isLoading'
    ])
  },
  watch: {
    deptId: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      },
      immediate: true
    }
  },
  mounted ()
  {
    var that = this;
    that.openPopup = function (row)
    {
      that.metaData.showAmapWindow = true;
      let marker = {
        position: row.coordinate.split(','),
        events: {
          mouseover ()
          { // 鼠标移入事件
            that.metaData.showAmapWindow = true;
          }
        }
      };
      that.metaData.popup = {
        position: row.coordinate.split(','),
        content: this.$refs.mapForm,
        visible: true,
        events: {
          close ()
          {
            that.metaData.showAmapWindow = false;
          }
        }
      };
      this.metaData.markers[0] = marker;
    };
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
.amap-demo {
  height: 100%;
}
</style>
