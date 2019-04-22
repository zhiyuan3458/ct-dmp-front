<template>
  <div class="lzy-table-wrapper"  v-loading.lock="isLoading">
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
      },
      isIndicatorShow: false
    };
  },
  methods: {
    /**
     * 添加
     * @author   yekuncai
     * @date     2018/11/16
     */
    addFn ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/add', { parentId: this.parentId });
    },
    /**
     * 查看
     * @author   yekuncai
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/show', { id: row.id });
    },
    /**
     * 编辑
     * @author   yekuncai
     * @date     2018/11/16
     */
    editFn (row)
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/edit', { id: row.id });
    },
    /**
     * 删除
     * @author   yekuncai
     * @date     2018/11/16
     */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let roadlawIds = '';
        for (let row of this.multipleSelection)
        {
          roadlawIds += row.id + ',';
        }
        roadlawIds = roadlawIds.substring(0, roadlawIds.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/remove', {id: roadlawIds}).then(() =>
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
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/listJson', {
        search: this.metaData.search,
        parentId: this.parentId,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
      this.metaData.search = '';
    },
    /**
     * 复选框选定
     * @author   yekuncai
     * @date     2018/11/16
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   yekuncai
     * @date     2018/11/16
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 表格页码跳转
     * @author   yekuncai
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
        this.metaData.search = null;
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
    ...mapGetters('integrityPlanManagementSystem/_INDICATOR', [
      'sideBar',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'parentId',
      'isRefreshList',
      'isLoading',
      'urlType'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   yekuncai
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
