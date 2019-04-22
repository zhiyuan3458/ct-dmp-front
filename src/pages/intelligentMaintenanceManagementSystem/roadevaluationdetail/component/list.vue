<template>
  <div class="lzy-form-wrapper" v-if="isListShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <el-form :model="formData">
      <table class="form-table" width="100%">
        <colgroup>
          <col width="11%"/>
          <col width="22%"/>
          <col width="11%"/>
          <col width="22%"/>
          <col width="11%"/>
          <col width="24%"/>
        </colgroup>
        <tr>
          <th class="form-header" colspan="12">
            <h2 style="text-align: center">公路技术状况评定明细表</h2>
          </th>
        </tr>
        <tr>
          <th>路线名称：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.routeCode" :readonly="true"></el-input>
          </td>
          <th>技术等级：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.technicalLeve" :readonly="true"></el-input>
          </td>
          <th>路面类型：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.roadType" :readonly="true"></el-input>
          </td>
        </tr>
        <tr>
          <th>车道：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.lane" :readonly="true"></el-input>
          </td>
          <th>检测方向：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.detectionDirection" :readonly="true"></el-input>
          </td>
          <th>检测时间：</th>
          <td>
            <el-input class="form-input" type="textarea" autosize v-model="formData.detectionDate" :readonly="true"></el-input>
          </td>
        </tr>
      </table>
    </el-form>
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="gridEntityInfo"
      :tableBtns="tableBtns"
      :listGridColumnInfo="listGridColumnInfo"
    ></custom-table>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
export default {
  components: {
    rightNavLayout,
    customTable
  },
  data ()
  {
    return {
      metaData: {
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [] // 表格复选框选中后的数据
      }
    };
  },
  methods: {
    getTableData ()
    {
      let obj = {
        search: this.metaData.search,
        year: this.roadDetail.year,
        routeCode: this.roadDetail.routeCode,
        lane: this.roadDetail.lane,
        detectionDirection: this.roadDetail.detectionDirection,
        startStake: this.roadDetail.startStake,
        endStake: this.roadDetail.endStake,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      };
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONDETAIL/listJson', obj);
      this.metaData.search = '';
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
     * @author   yekuncai
     * @date     2018/11/22
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
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADEVALUATIONDETAIL', [
      'isListShow',
      'formData',
      'tableList',
      'tableBtns',
      'roadDetail',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isRefreshList',
      'isLoading'
    ])
  },
  mounted ()
  {
    this.getTableData();
  },
  watch: {
    isRefreshList ()
    {
      this.getTableData();
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
