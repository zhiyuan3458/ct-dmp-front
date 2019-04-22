<template>
  <div style="height: 370px;">
    <custom-table
      height="320px"
      v-loading="metaData.isCurrentLoading"
      :tableList="currentList"
      :gridEntityInfo="currentGridEntityInfo"
      :tableBtns="tableBtns"
      :listGridColumnInfo="currentListGridColumnInfo"
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
        pageSize: 20,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        isCurrentLoading: false
      }
    };
  },
  methods: {
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_WEATHERFORECAST/currentShow', {id: row.id});
    },
    getTableData ()
    {
      this.metaData.isCurrentLoading = true;
      this.$store.dispatch('backStageSystem/_WEATHERFORECAST/currentListJson', {
        cityId: this.cityId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      }).then(() =>
      {
        this.metaData.search = '';
        this.metaData.isCurrentLoading = false;
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
    ...mapGetters('backStageSystem/_WEATHERFORECAST', [
      'currentList',
      'cityId',
      'tableBtns',
      'navigateMenus',
      'currentGridEntityInfo',
      'currentListGridColumnInfo'
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
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
