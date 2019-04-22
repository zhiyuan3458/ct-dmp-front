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
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        value: '',
        currentPage: 1,
        pageSize: 50,
        search: '',
        multipleSelection: [] // 表格复选框选中后的数据
      }
    };
  },
  methods: {
    addFn ()
    {
      this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/add');
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/show', {id: row.id});
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/edit', {id: row.id});
    },
    removeFn ()
    {
      if (this.multipleSelection === undefined || this.multipleSelection.length === 0)
      {
        this.$message(`未勾选数据!`);
      }
      else
      {
        this.$confirm('确认删除勾选的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.metaData.value = this.multipleSelection[0].value;
          let id = this.multipleSelection.map(multSelectValue => multSelectValue.id);
          this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/remove', id).then();
        });
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/listJson', {
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
      this.getTableData();
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_CASCADEMANAGEMENT', [
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'isRefresh',
      'gridEntityInfo',
      'listGridColumnInfo',
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
    isRefresh ()
    {
      this.getTableData();
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
