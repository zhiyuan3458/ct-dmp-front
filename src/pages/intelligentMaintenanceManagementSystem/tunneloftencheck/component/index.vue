<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="80px">
      <el-form-item label="管理单位">
        <ztree-select
          width="200px"
          v-model="administrationDeptId"
          :ztreeList="ztreeList"
          :readOnly="false"
        ></ztree-select>
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
      administrationDeptId: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      ztreeList: []
    };
  },
  methods: {
    /**
     * 查询提交
     * @author   gongjuncheng
     * @date     2019/2/26
     */
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      if (this.administrationDeptId)
      {
        let formCondition = {administrationDeptId: this.administrationDeptId, month: this.month, year: this.year};
        if (this.year === '' || this.year === null)
        {
          delete formCondition[`year`];
        }
        if (this.month === '' || this.month === null)
        {
          delete formCondition[`month`];
        }
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/showList', formCondition);
      }
      else
      {
        this.$message.error('请选择管理单位！');
      }
    },
    /**
     * 初始化select树数据
     * @author   gongjuncheng
     * @date     2019/2/26
     */
    initSelectTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/getTree').then(data =>
      {
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
