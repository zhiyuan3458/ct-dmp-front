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
        treeNodeCode: '',
        prifixUrl: this.$prifix.backstage + '/sys/bs/dictionary'
      }
    };
  },
  methods: {
    addFn ()
    {
      let entity = this.tableList.listData[0];
      this.$store.dispatch('backStageSystem/_DICTIONARY/add', {type: entity.type, parentId: entity.parentId, value: entity.value, name: entity.name});
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_DICTIONARY/show', {id: row.id});
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_DICTIONARY/edit', {id: row.id});
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
          this.$store.dispatch('backStageSystem/_DICTIONARY/remove', {id: id.join(','), value: this.multipleSelection[0].value}).then(data =>
          {
            if (data.code === this.$constant.ERR_OK)
            { // 刷新列表
              this.$store.dispatch('backStageSystem/_DICTIONARY/listJson', {
                value: this.metaData.value,
                search: this.metaData.search,
                pageNum: this.metaData.currentPage,
                pageSize: this.metaData.pageSize
              });
            }
          });
        });
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_DICTIONARY/listJson', {
        value: this.dictionaryCode,
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
      this.$store.dispatch('backStageSystem/_DICTIONARY/listJson', {
        value: this.dictionaryCode,
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DICTIONARY', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'dictionaryCode',
      'saveOrUpdateValue',
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
    dictionaryCode (newValue, oldValue)
    {
      this.metaData.search = null;
      this.metaData.currentPage = 1;
      this.metaData.pageSize = 50;
      this.getTableData();
    },
    isListShow (newValue, oldValue)
    {
      if (newValue)
      {
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
        this.$store.dispatch('backStageSystem/_DICTIONARY/listJson', {
          value: newValue,
          search: this.metaData.search,
          pageNum: this.metaData.currentPage,
          pageSize: this.metaData.pageSize
        });
      }
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
