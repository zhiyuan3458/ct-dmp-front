<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="50px">
      <el-form-item label="路线">
        <el-input class="form-input" placeholder="(双击选择)" @focus="routeDialogFn" v-model="routeCode"></el-input>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="investigateDirection" placeholder="请选择">
          <el-option
            v-for="item in directionList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden>
    </custom-dialog>
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="metaData.gridEntityInfo"
      :listGridColumnInfo="metaData.listGridColumnInfo"
      :isLoading="metaData.isLoading"
      @rowClick="handleClick"
    ></custom-table>
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
      routeCode: '', // 路线编号
      investigateDirection: '', // 调查方向
      directionList: [ '上行', '下行', '双向' ],
      year: '', // 年份
      month: '', // 月份
      metaData: {
        dialogVisible: false,
        readOnly: true,
        search: '',
        isLoading: false
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
        routeCode: this.routeCode,
        investigateDirection: this.investigateDirection,
        year: this.year,
        month: this.month
      };
      if (this.routeCode === '' || this.routeCode === null)
      {
        delete formCondition[`routeCode`];
      }
      if (this.investigateDirection === '' || this.investigateDirection === null)
      {
        delete formCondition[`investigateDirection`];
      }
      if (this.year === '' || this.year === null)
      {
        delete formCondition[`year`];
      }
      if (this.month === '' || this.month === null)
      {
        delete formCondition[`month`];
      }
      let obj = {
        search: this.metaData.search,
        extraCondition: JSON.stringify(formCondition) === '{}' ? null : JSON.stringify(formCondition),
        pageNum: 1,
        pageSize: 10
      };
      this.metaData.isLoading = true;
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGETUNNELDAMAGE/listJson', obj).then(data =>
      {
        this.metaData.listGridColumnInfo = data.data.listGridColumnInfo;
        this.metaData.gridEntityInfo = data.data.gridEntityInfo;
        this.metaData.gridEntityInfo.showOperateColumn = false;
        console.log(data.data.gridEntityInfo);
        this.tableList = {
          listData: data.data.tableList,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          total: data.total,
          pages: data.pages
        };
      });
      this.metaData.isLoading = false;
    },
    handleClick ({row, event, column})
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGETUNNELDAMAGE/show', {id: row.id});
    },
    /**
     * 模糊查询
     * @author   yekuncai
     * @date     2018/11/22
     */
    searchFn (search)
    {
      if (search === '')
      {
        this.metaData.search = null;
      }
      else
      {
        this.metaData.search = search;
      }
      this.submitForm();
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
