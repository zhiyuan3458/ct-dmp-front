<template>
  <div class="lzy-table-wrapper" v-if="isListShow">
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
      :prifixUrl="metaData.prifixUrl"
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
      style: {
        tableMaxHeight: 0,
        tableHeaderClass: 'table-title',
        setTableHeadBackground: 'table-title-class'
      },
      metaData: {
        lzyTableWrapperHeight: 0,
        currentPage: 1,
        pageSize: 20,
        search: null,
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: '',
        prifixUrl: this.$prifix.backstage + '/sys/bs/user'
      }
    };
  },
  methods: {
    /**
     * 操作按钮的新增
     * @author   yekuncai
     * @date     2018/10/23
     */
    addFn ()
    {
      this.$store.dispatch('backStageSystem/_USER/add', {deptId: this.deptId});
    },
    /**
     * 表格按钮的查看
     * @author   yekuncai
     * @date     2018/10/23
     */
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_USER/show', {id: row.id, deptId: this.deptId, userId: row.id});
    },
    /**
     * 操作按钮的编辑
     * @author   yekuncai
     * @date     2018/10/23
     */
    editFn (row)
    { // 编辑
      this.$store.dispatch('backStageSystem/_USER/edit', {id: row.id, deptId: this.deptId, userId: row.id});
    },
    /**
     * 操作按钮的删除
     * @author   yekuncai
     * @date     2018/10/23
     */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let userIds = '';
        for (let row of this.multipleSelection)
        {
          userIds += row.id + ',';
        }
        userIds = userIds.substring(0, userIds.length - 1);
        this.$confirm('此操作将永久删除选中行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('backStageSystem/_USER/remove', {userIds: userIds}).then(() =>
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
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_USER/listJson', {
        deptId: this.deptId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    /**
     * 复选框选定
     * @author   chenguang
     * @date     2018/9/30
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   chenguang
     * @date     2018/9/30
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 页面跳转
     * @author   chenguang
     * @date     2018/9/30
     */
    handleCurrentChange (currentPage)
    {
      this.metaData.currentPage = currentPage;
      this.getTableData();
    },
    /**
     * 模糊查询
     * @author   chenguang
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
      this.metaData.currentPage = 1;
      this.$store.dispatch('backStageSystem/_USER/listJson', {
        deptId: this.deptId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_USER', [
      'sideBar',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'isRefreshTree',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'deptId',
      'isLoading'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   chenguang
     * @date     2018/9/30
     */
    tableMaxHeight ()
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      if (this.sideBar.opened)
      {
        return document.body.offsetHeight - 136 - 38 - 36;
      }
      else
      {
        return document.body.offsetHeight - 136 - 38 - 5;
      }
    }
  },
  watch: {
    isListShow (newValue, oldValue)
    {
      if (newValue)
      {
        this.metaData.search = null;
        this.metaData.currentPage = 1;
        this.getTableData();
      }
    },
    deptId (newValue, oldValue)
    {
      if (newValue)
      {
        this.metaData.search = null;
        this.metaData.currentPage = 1;
        this.getTableData();
      }
    },
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.metaData.search = null;
        this.metaData.currentPage = 1;
        this.getTableData();
      }
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
