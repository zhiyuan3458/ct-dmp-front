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
              <h2 style="text-align: center">养护线路分等表</h2>
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
            <th>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode">
                <el-input class="form-input" type="textarea" autosize v-model="formData.routeCode" :readonly="readOnly"></el-input>
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
          </tr>
          <tr>
            <th>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName">
                <el-input class="form-input" type="textarea" autosize v-model="formData.routeName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>起讫桩号</th>
            <td>
              <el-form-item label="" prop="stakeNumber">
                <el-input class="form-input" type="textarea" autosize v-model="formData.stakeNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>养护里程</th>
            <td>
              <el-form-item label="" prop="maintenanceMileage">
                <el-input class="form-input" type="textarea" autosize v-model="formData.maintenanceMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>小计</th>
            <td>
              <el-form-item label="" prop="subtotal">
                <el-input class="form-input" type="textarea" autosize v-model="formData.subtotal" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 组件子表 -->
        <child-table
          relatedTableCode="MaintenanceLineGradingSub"
          :initDataInfo="maintenanceLineGradingSub"
          @change="maintenanceLineGradingSubChange"
          :readonly="readOnly"
          :isMinus = "false"
          :isAdd = "false"
        ></child-table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import childTable from '@/components/inline-edit-table';
import ztreeSelect from '@/components/ztreeSelect';
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
        maintenanceLineGradingSub: ''
      },
      routeList: [ '国道', '省道' ]
    };
  },
  methods: {
    maintenanceLineGradingSubChange (data)
    {
      this.metaData.maintenanceLineGradingSub = data;
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
            let maintenanceLineGradingSub = JSON.stringify(this.metaData.maintenanceLineGradingSub);
            Object.assign(obj, this.formData, {maintenanceLineGradingSub: maintenanceLineGradingSub});
            this.$store.dispatch('integrityPlanManagementSystem/_MAINTENANCELINEGRADING/save', obj);
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
      console.log(this.mlgParams);
      this.$store.dispatch('integrityPlanManagementSystem/_MAINTENANCELINEGRADING/showList', this.mlgParams);
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_MAINTENANCELINEGRADING', [
      'readOnly',
      'formData',
      'navigateMenus',
      'operateBtns',
      'maintenanceLineGradingSub',
      'mlgParams',
      'isLoading',
      'unitList'
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
