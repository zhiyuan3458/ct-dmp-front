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
import { remove } from '@/api/backStageSystem/activiti/processHistory/index';
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
    showFn (row)
    {
      let obj = {
        processInstanceId: row.processInstanceId,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      };
      this.$store.dispatch('backStageSystem/_PROCESSHISTORY/show', obj);
    },
    flowChartFn (row)
    {
      this.$store.dispatch('backStageSystem/_PROCESSHISTORY/flowChart', {processInstanceId: row.processInstanceId});
    },
    removeFn ()
    {
      if (this.multipleSelection !== 'undefined')
      {
        let len = this.multipleSelection.length;
        let count = len;
        for (let i = 0; i < len; i++)
        {
          let url = this.multipleSelection[i].url;
          let index = this.multipleSelection[i].url.lastIndexOf('/');
          url = url.substring(0, index + 1) + 'remove';
          let obj = { url: url, id: this.multipleSelection[i].businessId, processInstanceId: this.multipleSelection[i].processInstanceId };
          remove(obj).then(data =>
          {
            count -= 1;
            if (count === 0)
            {
              this.getTableData();
              this.multipleSelection = null;
            }
          });
        }
      }
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
      this.$store.dispatch('backStageSystem/_PROCESSHISTORY/listJson', obj);
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
    ...mapGetters('backStageSystem/_PROCESSHISTORY', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'activitiEntity',
      'isRefreshList',
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
    activitiEntity (newValue, oldValue)
    {
      this.getTableData();
    },
    isRefreshList (newValue, oldValue)
    {
      if (newValue === true)
      {
        // 刷新table列表
        this.getTableData();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
