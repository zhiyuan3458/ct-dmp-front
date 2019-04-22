<template>
  <div class="lzy-table-wrapper" v-if="isListShow">
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
      <observatory-map-form :bridgeInfo="metaData.mapBridgeInfo"></observatory-map-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
import customDialog from '@/components/dialog';
import observatoryMapForm from './mapForm';
export default {
  components: {
    rightNavLayout,
    customTable,
    customDialog,
    observatoryMapForm
  },
  data ()
  {
    return {
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        lzyTableWrapperHeight: 0,
        currentPage: 1,
        pageSize: 50,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: '',
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/add', {belongDeptId: this.deptId});
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/show', {id: row.id, deptId: this.deptId});
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/edit', {id: row.id, deptId: this.deptId});
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
        let observatoryIds = '';
        for (let row of this.multipleSelection)
        {
          observatoryIds += row.id + ',';
        }
        observatoryIds = observatoryIds.substring(0, observatoryIds.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/remove', {id: observatoryIds}).then(() =>
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/listJson', {
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
    ...mapGetters('roadNetworkAssetManagementSystem/_OBSERVATORY', [
      'sideBar',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'deptId',
      'isLoading'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   chenguang
     * @date     2018/9/30
     */
    tableMaxHeight ()
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      if (this.sideBar.opened)
      {
        return document.body.offsetHeight - 136 - 38 - 36;
      }
      else
      {
        return document.body.offsetHeight - 136 - 38 - 5;
      }
    }
  },
  watch: {
    isListShow (newValue, oldValue)
    {
      if (newValue)
      {
        this.getTableData();
      }
    },
    deptId (newValue, oldValue)
    {
      if (newValue)
      {
        this.getTableData();
      }
    },
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.getTableData();
      }
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
