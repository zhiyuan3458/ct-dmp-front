<template>
  <div class="lzy-table-wrapper">
    <custom-table
      :tableList="tableList"
      :gridEntityInfo="gridEntityInfo"
      :tableBtns="operateBtns"
      :listGridColumnInfo="listGridColumnInfo"
      :isLoading="isLoading"
    ></custom-table>
  </div>
</template>
<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar/index';
import customTable from '@/components/table/index';
export default {
  components: {
    rightNavLayout,
    customTable
  },
  props: {
    // 意见列表
    commentsInfo: {
      type: Object,
      default: function ()
      {
        return {};
      }
    }
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
        pageSize: 50,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
      },
      tableList: {},
      gridEntityInfo: {},
      operateBtns: [],
      listGridColumnInfo: [],
      isLoading: true
    };
  },
  methods: {
    returnFn ()
    {
      let obj = { isRefreshList: false };
      this.$store.dispatch('backStageSystem/_LEAVE/return', obj);
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_LEAVE/listJson', {
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
    }
  },
  computed: {
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
    commentsInfo (newValue)
    {
      this.tableList = {
        listData: newValue.data.tableList,
        pageNum: newValue.pageNum,
        pageSize: newValue.pageSize,
        total: newValue.total,
        pages: newValue.pages
      };
      this.gridEntityInfo = newValue.data.gridEntityInfo;
      this.operateBtns = newValue.data.operateBtns;
      this.listGridColumnInfo = newValue.data.listGridColumnInfo;
      this.isLoading = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../common/less/common';
</style>
