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
    <v-dialog title="流程图跟踪" :visible.sync="isflowChartShow">
      <iframe :src="flowChartUrl" width="800" height="600" scrolling="no"></iframe>
    </v-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
import dialog from '@/components/dialog';
export default {
  components: {
    rightNavLayout,
    customTable,
    'v-dialog': dialog
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
      },
      isflowChartShow: false,
      flowChartUrl: ''
    };
  },
  methods: {
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_PROCESSINSTANCE/show', {processInstanceId: row.processInstanceId});
    },
    flowChartFn (row)
    {
      this.flowChartUrl = `/bpm/visualProcessLog.html?processInstanceId=${row.processInstanceId}`;
      this.isflowChartShow = true;
    },
    removeFn ()
    {
      this.$message(`功能尚未完善!`);
    },
    getTableData ()
    {
      let obj = {
        search: this.metaData.search,
        id: this.activitiEntity.id,
        value: this.activitiEntity.value,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      };
      this.$store.dispatch('backStageSystem/_PROCESSINSTANCE/listJson', obj);
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
    ...mapGetters('backStageSystem/_PROCESSINSTANCE', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'isRefreshList',
      'activitiEntity',
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
    isRefreshList ()
    {
      this.getTableData();
    }
  }
};
</script>
<style lang="less">
@import '../../../../../common/less/common';
</style>
