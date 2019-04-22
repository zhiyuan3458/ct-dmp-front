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
    <v-dialog title="流程图编辑器" :visible.sync="isDesignerUrlShow" width="80%" @close="handleClose">
      <iframe :src="designerUrl" width="1480" height="850"></iframe>
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
      isDesignerUrlShow: false,
      designerUrl: ''
    };
  },
  methods: {
    /**
     * 关闭弹框时触发
     * @author   yekuncai
     * @date     2019/1/2
     */
    handleClose ()
    {
      this.getTableData();
    },
    /**
     * 新增，打开流程图编辑器
     * @author   yekuncai
     * @date     2018/12/15
     */
    addFn ()
    {
      let obj = { category: this.processdefinition.value, parentId: this.processdefinition.id };
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/add', obj);
    },
    /**
     * 查看
     * @author   yekuncai
     * @date     2018/12/15
     */
    showFn (row)
    {
      let obj = {modelId: row.modelId};
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/show', obj);
    },
    /**
     * 编辑
     * @author   yekuncai
     * @date     2018/12/15
     */
    editFn (row)
    {
      let obj = {modelId: row.modelId};
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/edit', obj);
    },
    /**
     * 编辑流程图
     * @author   yekuncai
     * @date     2018/12/15
     */
    setupFn (row)
    {
      this.isDesignerUrlShow = true;
      this.designerUrl = `/bpm/designer.html?id=${row.modelId}`;
    },
    /**
     * 部署流程定义
     * @author   yekuncai
     * @date     2018/12/15
     */
    deployFn (row)
    {
      let obj = {modelId: row.modelId};
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/deploy', obj).then(data =>
      {
        this.getTableData();
      });
    },
    /**
     * 对工作流扩展
     * @author   yekuncai
     * @date     2018/12/15
     */
    extensionFn (row)
    {
      localStorage.setItem('processName', row.name);
      localStorage.setItem('processParentId', row.parentId);
      let router = '/backStageSystem/extension';
      this.$router.push(router);
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
          let modelIds = '';
          for (let i = 0; i < this.multipleSelection.length; i++)
          {
            modelIds += this.multipleSelection[i].modelId + ',';
          }
          modelIds = modelIds.substring(0, modelIds.length - 1);
          let obj = { modelIds: modelIds };
          this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/remove', obj).then(data =>
          {
            if (data.data.type === 'success')
            {
              this.$message({
                type: 'success',
                message: data.data.msg
              });
            }
            else
            {
              this.$message.error(data.data.msg);
            }
            this.getTableData();
          });
        });
      }
    },
    getTableData ()
    {
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/listJson', {
        search: this.metaData.search,
        parentIds: this.processdefinition.id,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
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
    ...mapGetters('backStageSystem/_PROCESSDEFINITION', [
      'sideBar',
      'tableList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'isRefreshMiddleTree',
      'gridEntityInfo',
      'listGridColumnInfo',
      'processdefinition',
      'isRefreshList',
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
<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
