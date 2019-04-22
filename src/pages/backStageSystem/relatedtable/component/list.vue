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
      positionShow
    ></custom-table>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author lvzhiyuan
 * @date   2018/6/1
 */
import { mapGetters } from 'vuex';
import customTable from '@/components/table';
import rightNavLayout from '@/components/topToolBar';
export default {
  components: {
    customTable,
    rightNavLayout
  },
  data ()
  {
    return {
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        prifixUrl: this.$prifix.backstage + '/sys/bs/relatedtabledetail',
        value: '',
        currentPage: 1,
        pageSize: 50,
        search: null,
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
      }
    };
  },
  methods: {
    addFn ()
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/addDetail', {relatedTableId: this.relatedTableId});
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/showDetail', {id: row.id});
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/editDetail', {id: row.id});
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
          this.$store.dispatch('backStageSystem/_RELATEDTABLE/removeDetail', {id: id.join(',')}).then(data =>
          {
            // 刷新列表
            this.$store.dispatch('backStageSystem/_RELATEDTABLE/listJson', {
              relatedTableId: this.relatedTableId,
              search: this.metaData.search,
              pageNum: this.metaData.currentPage,
              pageSize: this.metaData.pageSize
            });
          });
        });
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/listJson', {
        relatedTableId: this.relatedTableId,
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
      this.$store.dispatch('backStageSystem/_RELATEDTABLE/listJson', {
        relatedTableId: this.relatedTableId,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_RELATEDTABLE', [
      'sideBar',
      'relatedTableId',
      'isListShow',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'operateBtns',
      'navigateMenus',
      'isLoading'
    ]),
    opened ()
    {
      return this.sideBar.opened;
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
    saveOrUpdateValue (newValue, oldValue)
    { // 刷新table列表
      if (newValue !== null && newValue !== '')
      {
        this.metaData.search = null;
        this.metaData.currentPage = 1;
        this.metaData.pageSize = 50;
        this.$store.dispatch('backStageSystem/_RELATEDTABLE/listJson', {
          relatedTableId: this.relatedTableId,
          search: this.metaData.search,
          pageNum: this.metaData.currentPage,
          pageSize: this.metaData.pageSize
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../common/less/common";
.permission-tree-container {
  height: calc(100% - 62px);
}
</style>
