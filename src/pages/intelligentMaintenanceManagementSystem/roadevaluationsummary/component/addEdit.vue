<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
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
        <inline-edit-table
          title="统计信息"
          relatedTableCode="RoadEvaluationSummarySub"
          :initDataInfo="roadevaluationsummarySub"
          @change="bridgeComponentChange"
          :deleteUrl="$prifix.maintenance + '/mt/ta/bridgeoftencheck/removeBridgeComponent'"
          :objectSpanMethod="expandCol"
          :readonly="true"
        ></inline-edit-table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
import { expandRows } from '@/common/js/util';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    inlineEditTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        roadevaluationsummarySub: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.roadevaluationsummarySub = data;
    },
    /**
     * 表单提交.
     * @author   yekuncai
     * @date     2019/3/1
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            let roadevaluationsummarySub = JSON.stringify(this.metaData.roadevaluationsummarySub);
            Object.assign(obj, this.formData, {roadevaluationsummarySub: roadevaluationsummarySub});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2019/3/1
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY/showList', this.deptId);
    },
    // 合并列
    expandCol ({ row, column, rowIndex, columnIndex })
    {
      if (columnIndex === 0 || columnIndex === 3)
      {
        const _row = this.range[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return [_row, _col];
      }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY', [
      'readOnly',
      'formData',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'roadevaluationsummarySub'
    ]),
    range ()
    {
      const list = JSON.parse(this.roadevaluationsummarySub);
      return expandRows(list, 'name');
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
