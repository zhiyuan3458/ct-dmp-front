<template>
  <div class="lzy-table-wrapper" v-loading.lock="isLoading">
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
import { Message } from 'element-ui';
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
        currentPage: 1,
        pageSize: 20,
        search: null,
        multipleSelection: [] // 表格复选框选中后的数据
      }
    };
  },
  methods: {
    addFn ()
    {
      var arry = this.deptIds.split(',');
      if (arry.length > 1 && arry.length !== 0)
      {
        Message.info('只能选择一个节点！');
      }
      else
      {
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/add', {administrationDeptId: this.deptIds});
      }
    },
    editFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/edit', {id: row.id, deptId: this.deptIds, userId: row.id});
    },
    showFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/show', {id: row.id});
    },
    removeFn ()
    {
      if (this.metaData.multipleSelection === undefined || this.metaData.multipleSelection.length === 0)
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
          let id = this.metaData.multipleSelection.map(multSelectValue => multSelectValue.id);
          this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/remove', {id: id.join(',')}).then(() =>
          {
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/listJson', {
              search: this.metaData.search,
              pageNum: this.metaData.currentPage,
              pageSize: this.metaData.pageSize
            });
          });
        });
      }
    },
    /**
     * 复选框选定
     * @author   gongjuncheng
     * @date     2019/1/3
     */
    handleSelectionChange (val)
    {
      this.metaData.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   gongjuncheng
     * @date     2019/1/3
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 页面跳转
     * @author   gongjuncheng
     * @date     2019/1/3
     */
    handleCurrentChange (currentPage)
    {
      this.metaData.currentPage = currentPage;
      this.getTableData();
    },
    getTableData ()
    {
      delete this.extraCondition['deptIds']; // 移除deptIds属性
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/listJson', {
        deptIds: this.deptIds,
        extraCondition: JSON.stringify(this.extraCondition) === '{}' ? null : JSON.stringify(this.extraCondition),
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    /**
     * 模糊查询
     * @author   gongjuncheng
     * @date     2019/1/3
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
    ...mapGetters('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'gridEntityInfo', // 表头
      'listGridColumnInfo', // 表头列
      'isLoading', // 动画加载
      'deptIds', // 部门id
      'extraCondition' // 额外的查询条件
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   gongjuncheng
     * @date     2019/1/3
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
    deptIds: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      },
      immediate: true
    },
    extraCondition: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
  @import '../../../../common/less/common';
</style>
