<template>
  <div class="lzy-table-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="gridEntityInfo"
      :tableBtns="tableBtns"
      :listGridColumnInfo="listGridColumnInfo"
      :isLoading="isLoading"
    ></custom-table>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
export default {
  components: {
    rightNavLayout,
    customTable
  },
  data ()
  {
    return {
      metaData: {
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [] // 表格复选框选中后的数据
      }
    };
  },
  methods: {
    /**
     * 添加
     * @author   chenguang
     * @date     2018/11/16
     */
    addFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/add', {deptId: this.deptId});
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/show', {id: row.id, deptId: this.deptId});
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/edit', {id: row.id, deptId: this.deptId});
    },
    /**
     * 评分
     */
    setupFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/extension', row.id);
    },
    getTableData ()
    {
      delete this.extraCondition['deptId']; // 移除deptIds属性
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/listJson', {
        deptId: this.deptId,
        extraCondition: JSON.stringify(this.extraCondition) === '{}' ? null : JSON.stringify(this.extraCondition),
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    /**
     * 删除
     * @author   chenguang
     * @date     2018/11/16
     */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let ids = '';
        for (let row of this.multipleSelection)
        {
          ids += row.id + ',';
        }
        ids = ids.substring(0, ids.length - 1);
        this.$confirm('此操作将永久删除选中行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/remove', {id: ids}).then(() =>
          {
            delete this.extraCondition['deptId']; // 移除deptIds属性
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_SCORETABLE/listJson', {
              deptId: this.deptId,
              extraCondition: JSON.stringify(this.extraCondition) === '{}' ? null : JSON.stringify(this.extraCondition),
              pageNum: this.metaData.currentPage,
              pageSize: this.metaData.pageSize
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() =>
        {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      else
      {
        this.$message('请选中一行或多行!');
      }
    },
    /**
     * 复选框选定
     * @author   chenguang
     * @date     2018/11/16
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   chenguang
     * @date     2018/11/16
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 表格页码跳转
     * @author   chenguang
     * @date     2018/11/16
     */
    handleCurrentChange (currentPage)
    {
      this.metaData.currentPage = currentPage;
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_SCORETABLE', [
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'extraCondition', // 额外的查询条件
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'deptId',
      'isLoading'
    ])
  },
  mounted ()
  {
    this.getTableData();
  },
  watch: {
    deptId: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      },
      immediate: true
    },
    extraCondition: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
