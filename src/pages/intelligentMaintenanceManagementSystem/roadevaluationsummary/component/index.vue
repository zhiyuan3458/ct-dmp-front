<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form label-width="70px">
      <el-form-item label="年份">
        <el-date-picker
          v-model="year"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="路线">
        <el-input class="form-input" placeholder="(双击选择)" @focus="routeDialogFn" v-model="routeCode"></el-input>
      </el-form-item>
      <el-form-item label="车道">
        <el-select v-model="lane" placeholder="请选择车道">
          <el-option
            v-for="item in laneList"
            :key="item.text"
            :label="item.text"
            :value="item.text">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="direction" placeholder="请选择方向">
          <el-option
            v-for="item in directionList"
            :key="item.text"
            :label="item.text"
            :value="item.text">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始桩号">
        <el-input class="form-input" v-model="startStake"></el-input>
      </el-form-item>
      <el-form-item label="结束桩号">
        <el-input class="form-input" v-model="endStake"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden>
    </custom-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import customDialog from '@/components/dialog';
import customTable from '@/components/table';
export default {
  components: {
    customDialog,
    customTable
  },
  data ()
  {
    return {
      tableList: {},
      year: '', // 年份
      routeCode: 'G105', // 路线编号
      lane: '', // 车道
      direction: '', // 检查方向
      startStake: '', // 开始桩号
      endStake: '', // 结束账号
      laneList: [], // 车道
      directionList: [], // 方向
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
      if (this.year === '')
      {
        this.$message('请选择年份!');
        return false;
      }
      if (this.routeCode === '')
      {
        this.$message('请选择路线编号!');
        return false;
      }
      if (this.lane === '')
      {
        this.$message('请选择车道!');
        return false;
      }
      if (this.direction === '')
      {
        this.$message('请选择方向!');
        return false;
      }
      let obj = {
        year: this.year,
        routeCode: this.routeCode,
        lane: this.lane,
        direction: this.direction,
        startStake: this.startStake,
        endStake: this.endStake
      };
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY/show', obj);
    }
  },
  created ()
  {
    this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADEVALUATIONSUMMARY/getTree').then(data =>
    {
      this.laneList = data.laneList.ztreeList;
      this.directionList = data.directionList.ztreeList;
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
