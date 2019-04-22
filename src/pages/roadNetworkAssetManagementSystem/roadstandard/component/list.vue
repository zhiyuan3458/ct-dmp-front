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
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        lzyTableWrapperHeight: 0,
        currentPage: 1,
        pageSize: 50,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADSTANDARD/add', {standardType: this.standardType});
    },
    /**
     * 查看
     * @author   chenguang
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADSTANDARD/show', {id: row.id, standardType: this.standardType});
    },
    /**
     * 编辑
     * @author   chenguang
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADSTANDARD/edit', {id: row.id, standardType: this.standardType});
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
        let roadstandardIds = '';
        for (let row of this.multipleSelection)
        {
          roadstandardIds += row.id + ',';
        }
        roadstandardIds = roadstandardIds.substring(0, roadstandardIds.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADSTANDARD/remove', {id: roadstandardIds}).then(() =>
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.metaData.currentPage = 1;
            this.metaData.pageSize = 50;
            this.getTableData();
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADSTANDARD/listJson', {
        standardType: this.standardType,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
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
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADSTANDARD', [
      'sideBar',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'standardType',
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
        this.getTableData();
      }
    },
    standardType:
      {
        handler (newValue, oldValue)
        {
          if (newValue)
          {
            this.getTableData();
          }
        },
        immediate: true
      },
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.getTableData();
      }
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
