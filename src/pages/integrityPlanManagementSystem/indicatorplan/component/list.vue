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
    ></custom-table>
    <v-dialog :visible.sync="isIndicatorShow" width="90%" :fullScreen="true" @close="handleClose">
      <indicator :rootId="rootId" :urlType="urlType"></indicator>
    </v-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import customTable from '@/components/table';
import dialog from '@/components/dialog';
import indicator from '../../indicator/rightPanel';
export default {
  components: {
    rightNavLayout,
    customTable,
    'v-dialog': dialog,
    indicator
  },
  data ()
  {
    return {
      style: {
        tableMaxHeight: 0
      },
      metaData: {
        lzyTableWrapperHeight: 0,
        currentPage: 1,
        pageSize: 50,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
      },
      isIndicatorShow: false,
      rootId: '', // 当前节点id
      urlType: '' // 请求类型：编辑或查看
    };
  },
  methods: {
    /**
     * 关闭弹框时触发
     * @author   yekuncai
     * @date     2019/1/16
     */
    handleClose ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/destroyed');
      this.rootId = '';
    },
    /**
     * 添加
     * @author   yekuncai
     * @date     2018/11/16
     */
    addFn ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/add', {indicatorType: this.indicatorType});
    },
    /**
     * 查看
     * @author   yekuncai
     * @date     2018/11/16
     */
    showFn (row)
    {
      this.isIndicatorShow = true;
      this.rootId = row.id;
      this.urlType = 'show';
    },
    /**
     * 编辑
     * @author   yekuncai
     * @date     2018/11/16
     */
    editFn (row)
    {
      // this.isIndicatorShow = true;
      // this.rootId = row.id;
      // this.urlType = 'edit';
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/edit', { id: row.id });
    },
    /**
     * 删除
     * @author   yekuncai
     * @date     2018/11/16
     */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let indicatorPlanIds = '';
        for (let row of this.multipleSelection)
        {
          indicatorPlanIds += row.id + ',';
        }
        indicatorPlanIds = indicatorPlanIds.substring(0, indicatorPlanIds.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/remove', {id: indicatorPlanIds}).then(() =>
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.metaData.currentPage = 1;
            this.metaData.pageSize = 50;
            this.$store.dispatch('setRefreshTodoTask', true);
            this.getTableData();
          });
        });
      }
      else
      {
        this.$message('请选中一行或多行!');
      }
    },
    getTableData ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/listJson', {
        search: this.metaData.search,
        indicatorType: this.indicatorType,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
      this.metaData.search = '';
    },
    /**
     * 复选框选定
     * @author   yekuncai
     * @date     2018/11/16
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   yekuncai
     * @date     2018/11/16
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
     * 表格页码跳转
     * @author   yekuncai
     * @date     2018/11/16
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
    ...mapGetters('integrityPlanManagementSystem/_INDICATORPLAN', [
      'sideBar',
      'tableList',
      'tableBtns',
      'gridEntityInfo',
      'listGridColumnInfo',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'indicatorType',
      'isRefreshList',
      'isLoading'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   yekuncai
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
    isRefreshList: {
      handler ()
      {
        this.getTableData();
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
@import '../../../../common/less/common';
</style>
