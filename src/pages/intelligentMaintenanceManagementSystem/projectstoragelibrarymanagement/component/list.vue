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
      :prifixUrl="metaData.prifixUrl"
    ></custom-table>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import common from '@/common/js/common';
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
        treeNodeCode: ''
      }
    };
  },
  methods: {
    addFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/add');
    },
    editFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/edit', {id: row.id, userId: row.id});
    },
    showFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/show', {id: row.id});
    },
    removeFn ()
    {
      if (this.metaData.multipleSelection === undefined || this.metaData.multipleSelection.length === 0)
      {
        this.$message.error(`未勾选数据!`);
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
          this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/remove', {id: id.join(',')}).then(() =>
          {
            this.getTableData();
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
    handleChangePosition (name)
    {
      const preId = common.checkChangePositon(this.tableList.listData, this.metaData.multipleSelection, name);
      if (preId)
      {
        let obj = {
          type: name,
          id: this.metaData.multipleSelection[0].id,
          preId: preId
        };
        this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/changePosition', obj).then(() =>
        {
          this.$message({
            message: '修改顺序成功!',
            type: 'success',
            duration: 3000
          });
          this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/listJson', {
            search: this.metaData.search,
            pageNum: this.metaData.currentPage,
            pageSize: this.metaData.pageSize
          });
        });
      }
    },
    getTableData ()
    {
      delete this.extraCondition['deptIds']; // 移除deptIds属性
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/listJson', {
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
    ...mapGetters('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'gridEntityInfo',
      'listGridColumnInfo',
      'isLoading', // 动画加载
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
    extraCondition: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.getTableData();
        }
      }
    },
    isListShow: {
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
