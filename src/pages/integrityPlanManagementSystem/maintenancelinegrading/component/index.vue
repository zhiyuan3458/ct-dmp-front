<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="70px">
      <el-form-item label="单位">
        <ztree-select
          width="200px"
          v-model="unit"
          :ztreeList="unitList"
          :readOnly="false"
        ></ztree-select>
      </el-form-item>
      <el-form-item label="路线编号">
        <el-input class="form-input" placeholder="(双击选择)" @focus="routeDialogFn" v-model="routeCode"></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-date-picker
          v-model="annual"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden></custom-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
import customDialog from '@/components/dialog';
export default {
  components: {
    ztreeSelect,
    customDialog
  },
  data ()
  {
    return {
      unit: '', // 线路性质
      unitList: [], // 单位列表
      routeCode: '', // 路线编号
      annual: '', // 年份
      metaData: {
        dialogVisible: false
      }
    };
  },
  methods: {
    routeDialogFn ()
    {
      this.metaData.dialogVisible = true;
    },
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {
        unit: this.unit,
        routeCode: this.routeCode,
        annual: this.annual
      };
      if (this.unit === '' || this.unit === null)
      {
        delete formCondition[`unit`];
      }
      if (this.routeCode === '' || this.routeCode === null)
      {
        delete formCondition[`routeCode`];
      }
      if (this.annual === '' || this.annual === null)
      {
        delete formCondition[`annual`];
      }
      let extraCondition = JSON.stringify(formCondition) === '{}' ? null : JSON.stringify(formCondition);
      let obj = { routeCode: this.routeCode, extraCondition: extraCondition };
      this.$store.dispatch('integrityPlanManagementSystem/_MAINTENANCELINEGRADING/showList', obj);
    }
  },
  created ()
  {
    this.$store.dispatch('integrityPlanManagementSystem/_MAINTENANCELINEGRADING/getTree').then(data =>
    {
      this.unitList = data.data.unitList;
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
