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
              <h2 style="text-align: center">小修保养投资计划表</h2>
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
            <th>隧道座数</th>
            <td>
              <el-form-item label="" prop="tunnelSeatNumber">
                <el-input class="form-input" type="textarea" autosize v-model="formData.tunnelSeatNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>基本支出(元)</th>
            <td>
              <el-form-item label="" prop="basicSpending">
                <el-input class="form-input" type="textarea" autosize v-model="formData.basicSpending" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>项目支出(元)</th>
            <td>
              <el-form-item label="" prop="projectSpending">
                <el-input class="form-input" type="textarea" autosize v-model="formData.projectSpending" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>费用总计(元)</th>
            <td>
              <el-form-item label="" prop="totalCost">
                <el-input class="form-input" type="textarea" autosize v-model="formData.totalCost" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>年公里成本(元/公里)</th>
            <td>
              <el-form-item label="" prop="annualKmCost">
                <el-input class="form-input" type="textarea" autosize v-model="formData.annualKmCost" :readonly="readOnly"></el-input>
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
        <!-- 组件子表 -->
        <child-table
          relatedTableCode="MinorMaintenanceSub"
          :initDataInfo="minorMaintenanceSub"
          @change="minorMaintenanceSubChange"
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
        minorMaintenanceSub: ''
      },
      routeList: [ '国道', '省道' ]
    };
  },
  methods: {
    minorMaintenanceSubChange (data)
    {
      this.metaData.minorMaintenanceSub = data;
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
            let minorMaintenanceSub = JSON.stringify(this.metaData.minorMaintenanceSub);
            Object.assign(obj, this.formData, {minorMaintenanceSub: minorMaintenanceSub});
            this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/save', obj);
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
      this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/showList', this.extraCondition);
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_MINORMAINTENANCE', [
      'readOnly',
      'formData',
      'navigateMenus',
      'operateBtns',
      'minorMaintenanceSub',
      'extraCondition',
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
