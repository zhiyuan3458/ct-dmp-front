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
import rightNavLayout from '@/components/topToolBar/index';
import customTable from '@/components/table/index';
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
        value: '',
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
      }
    };
  },
  methods: {
    addFn ()
    {
      this.$store.dispatch('backStageSystem/_LEAVE/add', '');
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_LEAVE/show', { id: row.id });
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_LEAVE/edit', { id: row.id });
    },
    removeFn ()
    {
      let id = '';
      if (this.multipleSelection !== undefined)
      {
        for (let i = 0; i < this.multipleSelection.length; i++)
        {
          id += this.multipleSelection[i].id + ',';
        }
        id = id.substring(0, id.length - 1);
        let obj = { id: id };
        this.$store.dispatch('backStageSystem/_LEAVE/remove', obj).then(data =>
        {
          this.$store.dispatch('setRefreshTodoTask', true);
          this.getTableData();
        });
      }
      else
      {
        this.$message('请选择!');
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_LEAVE/listJson', {
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
      this.metaData.search = '';
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
    getLeave ()
    {
      let obj = { id: this.businessId };
      this.$store.dispatch('backStageSystem/_LEAVE/edit', obj);
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
    ...mapGetters('backStageSystem/_LEAVE', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'isRefreshList',
      'gridEntityInfo',
      'listGridColumnInfo',
      'processdefinition',
      'isLoading'
    ]),
    ...mapGetters([
      'businessId'
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
    isRefreshList (newValue)
    {
      if (newValue === true)
      {
        this.getTableData();
      }
    },
    businessId (newValue)
    {
      if (newValue !== '')
      {
        this.getLeave();
      }
    }
  },
  created ()
  {
    if (this.businessId !== '')
    {
      this.getLeave();
    }
    else
    {
      this.getTableData();
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
