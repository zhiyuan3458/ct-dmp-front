<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form label-width="70px">
      <el-form-item label="单位">
        <ztree-select
          width="200px"
          v-model="maintenanceStation"
          :ztreeList="maintenanceStationList"
          :readOnly="false"
        ></ztree-select>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="years"
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
      maintenanceStation: '', // 养护站
      maintenanceStationList: [], // 养护站列表
      years: '' // 年份
    };
  },
  methods: {
    submitForm ()
    {
      if (this.maintenanceStation === '')
      {
        this.$message('请选择养护站!');
        return false;
      }
      if (this.years === '')
      {
        this.$message('请选择年份!');
        return false;
      }
      let obj = {
        maintenanceStation: this.maintenanceStation,
        years: this.years
      };
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MATERIALCONSUMPTIONSTATISTICS/showList', obj);
    }
  },
  created ()
  {
    this.$store.dispatch('intelligentMaintenanceManagementSystem/_MATERIALCONSUMPTIONSTATISTICS/getTree').then(data =>
    {
      console.log(data);
      this.maintenanceStationList = data.maintenanceStationList;
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
