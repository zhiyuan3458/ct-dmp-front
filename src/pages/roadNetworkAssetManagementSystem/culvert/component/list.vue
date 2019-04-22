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
    <custom-dialog title="地图定位" :visible.sync="metaData.dialogVisible" isHidden>
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
      <culvert-map-form :bridgeInfo="metaData.mapBridgeInfo"></culvert-map-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
import customDialog from '@/components/dialog';
import culvertMapForm from './mapForm';
export default {
  components: {
    rightNavLayout,
    customTable,
    customDialog,
    culvertMapForm
  },
  data ()
  {
    return {
      metaData: {
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        dialogVisible: false,
        mapCenter: [113.307486, 23.057851],
        zoom: 12,
        markers: [], // 标记点
        showAmapWindow: false,
        popup: null, // 标记点弹窗
        position: [],
        mapBridgeInfo: null // 地图表格中展示的涵洞信息
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/add', {deptId: this.deptId});
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/show', {id: row.id, deptId: this.deptId, userId: row.id});
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/edit', {id: row.id, deptId: this.deptId, userId: row.id});
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
        let ids = '';
        for (let row of this.multipleSelection)
        {
          ids += row.id + ',';
        }
        ids = ids.substring(0, ids.length - 1);
        this.$confirm('此操作将永久删除选中行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/remove', {id: ids}).then(() =>
          {
            this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/listJson', {
              deptId: this.deptId,
              pageNum: this.metaData.currentPage,
              pageSize: this.metaData.pageSize
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() =>
        {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
     * @author   gongjuncheng
     * @date     2019/3/2
     */
    gisLocationFn (row)
    {
      this.metaData.dialogVisible = true;
      this.metaData.mapBridgeInfo = JSON.stringify(row);
      this.openPopup(row);
    },
    getTableData ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/listJson', {
        deptId: this.deptId,
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
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_CULVERT', [
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
</style>
