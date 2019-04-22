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
      <el-form-item label="年份">
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
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    ztreeSelect
  },
  data ()
  {
    return {
      unit: '', // 单位
      unitList: [], // 单位树
      annual: '' // 年份
    };
  },
  methods: {
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {
        unit: this.unit,
        annual: this.annual
      };
      if (this.unit === '' || this.unit === null)
      {
        delete formCondition[`unit`];
      }
      if (this.annual === '' || this.annual === null)
      {
        delete formCondition[`annual`];
      }
      let extraCondition = JSON.stringify(formCondition) === '{}' ? null : JSON.stringify(formCondition);
      this.$store.dispatch('integrityPlanManagementSystem/_ROADMAINTENANCEPROJECTPLAN/showList', extraCondition);
    }
  },
  created ()
  {
    this.$store.dispatch('integrityPlanManagementSystem/_ROADMAINTENANCEPROJECTPLAN/getTree').then(data =>
    {
      this.unitList = data.unitList;
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
