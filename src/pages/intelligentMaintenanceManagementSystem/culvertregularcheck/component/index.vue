<template>
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="80px">
      <el-form-item label="管理单位">
        <ztree-select
          width="200px"
          v-model="deptIds"
          :ztreeList="ztreeList"
          :readOnly="false"
        ></ztree-select>
      </el-form-item>
      <el-form-item label="路线:" prop="routeCode">
        <el-input v-model="routeCode" placeholder="请选择"></el-input>
      </el-form-item>
      <el-form-item label="区间路段:" prop="sectionName">
        <el-input v-model="sectionName" placeholder="请选择"></el-input>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="year"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="month"
          type="month"
          format="M月"
          value-format="M"
          placeholder="选择月">
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
      deptIds: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      sectionName: '海珠-灵山',
      routeCode: 'G102',
      ztreeList: []
    };
  },
  computed: {
  },
  methods: {
    /**
     * 表单提交
     */
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {deptIds: this.deptIds, month: this.month, year: this.year};
      if (this.year === '' || this.year === null)
      {
        delete formCondition[`year`];
      }
      if (this.routeCode === '' || this.routeCode === null)
      {
        delete formCondition[`routeCode`];
      }
      if (this.sectionName === '' || this.sectionName === null)
      {
        delete formCondition[`sectionName`];
      }
      if (this.month === '' || this.month === null)
      {
        delete formCondition[`month`];
      }
      if (this.deptIds === '' || this.deptIds === null)
      {
        this.$message({
          showClose: true,
          message: '请选择管理单位！',
          type: 'info'
        });
      }
      else
      {
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTREGULARCHECK/showList', formCondition);
      }
    },

    /**
     * 初始化select树数据
     * @author   chenguang
     * @date     2019/1/24
     */
    initSelectTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTREGULARCHECK/getTree').then(data =>
      {
        this.deptIds = data.deptId;
        this.ztreeList = data.ztreeList;
      });
    }
  },
  mounted ()
  {
    /**
       * 初始化树
       * @param newValue
       * @param oldValue
       */
    this.initSelectTree();
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
</style>
