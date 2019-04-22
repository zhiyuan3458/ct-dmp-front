<template>
  <div class="lzy-table-wrapper">
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
    ></custom-table>
  </div>
</template>

<script>
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
      metaData: {
        currentPage: 1,
        pageSize: 20,
        search: '',
        multipleSelection: [] // 表格复选框选中后的数据
      }
    };
  },
  methods: {
    /**
       * @Description: 添加
       * @author durenniu
       * @date 2019/1/2
       */
    addFn ()
    {
      let deptIds = this.deptIds.split(',');
      if (deptIds.length < 1)
      {
        this.$message({
          showClose: true,
          type: 'info',
          message: '管理单位为空!'
        });
      }
      if (deptIds.length > 1)
      {
        this.$message({
          showClose: true,
          type: 'info',
          message: '管理单位不能多选!'
        });
        return false;
      }
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/add', {belongDeptId: this.deptIds});
    },
    /**
       * @Description: 查看
       * @author durenniu
       * @date 2019/1/2
       */
    showFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/show', {id: row.id});
    },
    /**
       * @Description: 编辑
       * @author durenniu
       * @date 2019/1/2
       */
    editFn (row)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/edit', {id: row.id, deptId: this.deptIds, userId: row.id});
    },
    /**
       * @Description: 删除
       * @author durenniu
       * @date 2019/1/2
       */
    removeFn ()
    {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0)
      {
        let maintenancepatrolId = '';
        for (let row of this.multipleSelection)
        {
          maintenancepatrolId += row.id + ',';
        }
        maintenancepatrolId = maintenancepatrolId.substring(0, maintenancepatrolId.length - 1);
        this.$confirm('是否删除选中行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/remove', {id: maintenancepatrolId}).then(() =>
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.metaData.currentPage = 1;
            this.metaData.pageSize = 50;
            this.getTableData();
          });
        });
      }
      else
      {
        this.$message('请选中一行或多行!');
      }
    },
    /**
       * @Description: 表格数据初始化
       * @author durenniu
       * @date 2019/1/2
       */
    getTableData ()
    {
      delete this.extraCondition['deptIds']; // 移除deptIds属性
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/listJson', {
        deptIds: this.deptIds,
        extraCondition: JSON.stringify(this.extraCondition) === '{}' ? null : JSON.stringify(this.extraCondition),
        search: this.metaData.search,
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    /**
       * @Description: 复选框选定
       * @author durenniu
       * @date 2019/1/2
       */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
       * @Description: 一页显示多少条
       * @author durenniu
       * @date 2019/1/2
       */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      this.getTableData();
    },
    /**
       * @Description: 表格页码跳转
       * @author durenniu
       * @date 2019/1/2
       */
    handleCurrentChange (currentPage)
    {
      this.metaData.currentPage = currentPage;
      this.getTableData();
    },
    /**
       * @Description: 模糊查询
       * @author durenniu
       * @date 2019/1/2
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
    ...mapGetters('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL', [
      'tableList', // 涵洞经常性检查表格list
      'tableBtns', // 表格功能按钮
      'extraCondition', // 额外的查询条件
      'gridEntityInfo', // 表头
      'listGridColumnInfo', // 表头列
      'navigateMenus', // 导航栏按钮
      'operateBtns', // 功能按钮
      'deptIds', // 部门id
      'isLoading' // 动画加载
    ])
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
