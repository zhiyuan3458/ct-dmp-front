<template>
  <div class="lzy-table-wrapper" v-if="isListShow">
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
        prifixUrl: this.$prifix.backstage + '/sys/bs/desk',
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
      this.$store.dispatch('backStageSystem/_DESK/add', {systemId: this.systemId});
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_DESK/edit', {id: row.id, systemId: this.systemId});
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_DESK/show', {id: row.id, systemId: row.id});
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
          this.$store.dispatch('backStageSystem/_DESK/remove', {id: id.join(',')}).then(() =>
          {
            this.$store.dispatch('backStageSystem/_DESK/listJson', {
              systemId: this.systemId,
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
     * @author   chenguang
     * @date     2018/9/30
     */
    handleSelectionChange (val)
    {
      this.metaData.multipleSelection = val;
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
        this.$store.dispatch('backStageSystem/_DESK/changePosition', obj).then(() =>
        {
          this.$message({
            message: '修改顺序成功!',
            type: 'success',
            duration: 3000
          });
          this.$store.dispatch('backStageSystem/_DESK/listJson', {
            systemId: this.systemId,
            search: this.metaData.search,
            pageNum: this.metaData.currentPage,
            pageSize: this.metaData.pageSize
          });
        });
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_DESK/listJson', {
        systemId: this.systemId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
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
      this.$store.dispatch('backStageSystem/_DESK/listJson', {
        systemId: this.systemId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DESK', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'systemId',
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
    isListShow (newValue, oldValue)
    {
      if (newValue)
      {
        this.metaData.search = null;
        this.metaData.currentPage = 1;
        this.metaData.pageSize = 50;
        this.getTableData();
      }
    },
    systemId (newValue, oldValue)
    {
      this.metaData.search = null;
      this.metaData.currentPage = 1;
      this.metaData.pageSize = 50;
      this.getTableData();
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
