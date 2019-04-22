<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="50px">
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
// import TreeTool from '@/class/ztreeTool/treeTool';
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
      deptIds: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      metaData: {
        dialogVisible: false,
        readOnly: true
      }
    };
  },
  methods: {
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
      if (this.month === '' || this.month === null)
      {
        delete formCondition[`month`];
      }
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BITUMENROADDAMAGE/listJson', { pageNum: 1, pageSize: 10 }).then(data =>
      {
        this.metaData.listGridColumnInfo = data.data.listGridColumnInfo;
        this.metaData.gridEntityInfo = data.data.gridEntityInfo;
        this.tableList = {
          listData: data.data.tableList,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          total: data.total,
          pages: data.pages
        };
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
    // this.initTree();
    // this.$store.dispatch('intelligentMaintenanceManagementSystem/_SANDSTONEDAMAGE/showList');
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
</style>
