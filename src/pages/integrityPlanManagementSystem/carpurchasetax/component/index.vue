<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="70px">
      <el-form-item label="计划所属">
        <el-select v-model="planAffiliation" placeholder="请选择">
          <el-option
            v-for="item in planAffiliationList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开工年限">
        <el-date-picker
          v-model="startYear"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="完工年限">
        <el-date-picker
          v-model="endYear"
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
export default {
  data ()
  {
    return {
      planAffiliation: '', // 计划所属
      planAffiliationList: [],
      startYear: '', // 开工年限
      endYear: '' // 完工年限
    };
  },
  methods: {
    submitForm ()
    {
      if (this.planAffiliation.length === 0)
      {
        this.$message('请选择计划所属!');
        return false;
      }
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {
        planAffiliation: this.planAffiliation,
        startYear: this.startYear,
        endYear: this.endYear
      };
      if (this.startYear === '' || this.startYear === null)
      {
        delete formCondition[`startYear`];
      }
      if (this.endYear === '' || this.endYear === null)
      {
        delete formCondition[`endYear`];
      }
      let extraCondition = JSON.stringify(formCondition) === '{}' ? null : JSON.stringify(formCondition);
      let obj = { planAffiliation: this.planAffiliation, extraCondition: extraCondition };
      this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAX/showList', obj);
    }
  },
  created ()
  {
    this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAX/getTree').then(data =>
    {
      this.planAffiliationList = data.data.planAffiliationList;
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
