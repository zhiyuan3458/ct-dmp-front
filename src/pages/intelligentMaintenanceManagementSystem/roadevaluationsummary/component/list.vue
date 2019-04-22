<template>
  <div class="lzy-form-wrapper" v-if="isListShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="4">
              <h2 style="text-align: center">公路技术状况评定汇总表</h2>
            </th>
          </tr>
          <tr>
            <th>所属省市</th>
            <td>
              <el-input class="form-input" v-model="formData.provinceAndCity" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>路线编码</th>
            <td>
              <el-input class="form-input" v-model="formData.routeCode" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>路面类型</th>
            <td>
              <el-input class="form-input" v-model="formData.roadType" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>评定长度(km)</th>
            <td>
              <el-input class="form-input" v-model="formData.length" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>养管单位</th>
            <td>
              <el-input class="form-input" v-model="formData.tubeUnit" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>主管单位</th>
            <td>
              <el-input class="form-input" v-model="formData.directorUnit" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>平均MQI</th>
            <td>
              <el-input class="form-input" v-model="formData.averageMQI" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>评定等级</th>
            <td>
              <el-input class="form-input" v-model="formData.rating" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>平均MQI(上行)</th>
            <td>
              <el-input class="form-input" v-model="formData.upAverageMQI" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>评定等级(上行)</th>
            <td>
              <el-input class="form-input" v-model="formData.upRating" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>平均MQI(下行)</th>
            <td>
              <el-input class="form-input" v-model="formData.downAverageMQI" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>评定等级(下行)</th>
            <td>
              <el-input class="form-input" v-model="formData.downRating" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
          <tr>
            <th>上行评定长度(km)</th>
            <td>
              <el-input class="form-input" v-model="formData.upEvaluationLength" :readonly="true" style="width: 145px"></el-input>
            </td>
            <th>下行评定长度(km)</th>
            <td>
              <el-input class="form-input" v-model="formData.downEvaluationLength" :readonly="true" style="width: 145px"></el-input>
            </td>
          </tr>
        </table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="20%"/>
            <col width="20%"/>
            <col width="20%"/>
            <col width="20%"/>
            <col width="20%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="5">
              <h2 style="text-align: center">统计信息</h2>
            </th>
          </tr>
          <tr>
            <th>
              <h2 style="text-align: center">统计信息</h2>
            </th>
          </tr>
        </table>
      </el-form>
    </div>
    <inline-edit-table
      title="详细内容"
      relatedTableCode="BridgeTunnelDamageSub"
      :initDataInfo="subList"
      @change="bridgeComponentChange"
      :deleteUrl="$prifix.maintenance + '/sys/bridgeoftencheck/removeBridgeComponent'"
      :objectSpanMethod="expandCol"
      :readonly="true"
    ></inline-edit-table>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import inlineEditTable from '@/components/inline-edit-table';
import { expandRows } from '@/common/js/util';
export default {
  components: {
    rightNavLayout,
    inlineEditTable
  },
  data ()
  {
    return {
      metaData: {
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        subList: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.subList = data;
    },
    getTableData ()
    {
      let obj = {
        search: this.search,
        year: this.roadSummary.year,
        routeCode: this.roadSummary.routeCode,
        lane: this.roadSummary.lane,
        direction: this.roadSummary.direction,
        startStake: this.roadSummary.startStake,
        endStake: this.roadSummary.endStake,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      };
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY/listJson', obj);
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
    // 合并列
    expandCol ({ row, column, rowIndex, columnIndex })
    {
      // if (columnIndex === 0 || columnIndex === 3)
      // {
      //   const _row = this.range[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return [_row, _col];
      // }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY', [
      'isListShow',
      'formData',
      'subList',
      'tableBtns',
      'roadSummary',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isRefreshList',
      'isLoading'
    ]),
    range ()
    {
      const list = JSON.parse(this.subList);
      return expandRows(list, 'name');
    }
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
