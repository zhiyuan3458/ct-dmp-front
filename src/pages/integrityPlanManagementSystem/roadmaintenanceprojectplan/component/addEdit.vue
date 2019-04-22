<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">公路养护工程项目计划表</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>单位</th>
            <td>
              <el-form-item label="" prop="unit" :rules="[$validate.Required]">
                <ztree-select
                  width="200px"
                  v-model="formData.unit"
                  :ztreeList="unitList"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>年度</th>
            <td>
              <el-form-item label="" prop="annual" :rules="[$validate.Required]">
                <el-date-picker
                  v-model="formData.annual"
                  type="year"
                  format="yyyy年"
                  value-format="yyyy"
                  :readonly="readOnly"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>序号</th>
            <td>
              <el-form-item label="" prop="serialNumber">
                <el-input class="form-input" type="textarea" autosize v-model="formData.serialNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>段别</th>
            <td>
              <el-form-item label="" prop="segment">
                <el-input class="form-input" type="textarea" autosize v-model="formData.segment" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>线路名称</th>
            <td>
              <el-form-item label="" prop="routeName">
                <el-input class="form-input" type="textarea" autosize v-model="formData.routeName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桩号地点</th>
            <td>
              <el-form-item label="" prop="stakeSite">
                <el-input class="form-input" type="textarea" autosize v-model="formData.stakeSite" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>工程名称</th>
            <td>
              <el-form-item label="" prop="projectNmae" :rules="[$validate.Required]">
                <el-input class="form-input" type="textarea" autosize v-model="formData.projectNmae" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>改善(或建设)意见</th>
            <td>
              <el-form-item label="" prop="opinion">
                <el-input class="form-input" type="textarea" autosize v-model="formData.opinion" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>计量单位</th>
            <td>
              <el-form-item label="" prop="measuringUnit">
                <el-input class="form-input" type="textarea" autosize v-model="formData.measuringUnit" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>工程数量:年度计划</th>
            <td>
              <el-form-item label="" prop="yearPlan">
                <el-input class="form-input" type="textarea" autosize v-model="formData.yearPlan" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>工程数量:调整计划</th>
            <td>
              <el-form-item label="" prop="adjustmentPlan">
                <el-input class="form-input" type="textarea" autosize v-model="formData.adjustmentPlan" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>养路费投资计划(万元):总投资</th>
            <td>
              <el-form-item label="" prop="totalInvestment">
                <el-input class="form-input" type="textarea" autosize v-model="formData.totalInvestment" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>养路费投资计划(万元):上年累计完成投资</th>
            <td>
              <el-form-item label="" prop="previousYearInvestment">
                <el-input class="form-input" type="textarea" autosize v-model="formData.previousYearInvestment" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>备注</th>
            <td>
              <el-form-item label="" prop="comment">
                <el-input class="form-input" type="textarea" autosize v-model="formData.comment" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="form-table1" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="88%"/>
          </colgroup>
          <tr>
            <th rowspan="3" class="up-constructor">公路养护工程项目计划子表</th>
            <td class="child-table-container">
              <div class="child-table-wrapper">
                <child-table
                  title=""
                  relatedTableCode="RoadMaintenanceProjectPlanSub"
                  :initDataInfo="roadMaintenanceProjectPlanSub"
                  @change="roadMaintenanceProjectPlanSubChange"
                  :readonly="readOnly"
                  :deleteUrl="$prifix.plan + '/pm/po/roadmaintenanceprojectplan/removeSub'"
                ></child-table>
              </div>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import { mapGetters } from 'vuex';
import childTable from '@/components/inline-edit-table';
export default {
  components: {
    rightNavLayout,
    childTable,
    ztreeSelect
  },
  data ()
  {
    return {
      metaData: {
        roadMaintenanceProjectPlanSub: ''
      }
    };
  },
  methods: {
    roadMaintenanceProjectPlanSubChange (data)
    {
      this.metaData.roadMaintenanceProjectPlanSub = data;
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
            let roadMaintenanceProjectPlanSub = JSON.stringify(this.metaData.roadMaintenanceProjectPlanSub);
            Object.assign(obj, this.formData, {roadMaintenanceProjectPlanSub: roadMaintenanceProjectPlanSub});
            this.$store.dispatch('integrityPlanManagementSystem/_ROADMAINTENANCEPROJECTPLAN/save', obj);
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
      this.$store.dispatch('integrityPlanManagementSystem/_ROADMAINTENANCEPROJECTPLAN/showList', this.extraCondition);
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_ROADMAINTENANCEPROJECTPLAN', [
      'readOnly',
      'formData',
      'isLoading',
      'unitList',
      'navigateMenus',
      'operateBtns',
      'roadMaintenanceProjectPlanSub',
      'extraCondition'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.form-table1 {
  .up-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
  .down-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
}
</style>
