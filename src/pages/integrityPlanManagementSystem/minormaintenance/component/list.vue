<template>
  <div class="lzy-table-wrapper" v-if="isListShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="gridEntityInfo"
      :tableBtns="tableBtns"
      :listGridColumnInfo="listGridColumnInfo"
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
      this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/add');
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/show', { id: row.id });
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/edit', { id: row.id });
    },
    getTableData ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/listJson', {
        extraCondition: this.extraCondition,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
      this.metaData.search = '';
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
          this.$store.dispatch('integrityPlanManagementSystem/_MINORMAINTENANCE/remove', {ids: ids}).then(() =>
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTableData();
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
        this.metaData.search = '';
      }
      else
      {
        this.metaData.search = search;
      }
      this.metaData.currentPage = 1;
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_MINORMAINTENANCE', [
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'extraCondition',
      'isLoading',
      'isListShow',
      'isRefreshList'
    ])
  },
  watch: {
    isRefreshList: {
      handler ()
      {
        this.getTableData();
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
