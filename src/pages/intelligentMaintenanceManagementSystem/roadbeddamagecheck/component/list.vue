<template>
  <div class="lzy-table-wrapper">
    <custom-table
      :gridEntityInfo="gridEntityInfo"
      :tableList="tableList"
      :listGridColumnInfo="listGridColumnInfo"
      :isLoading="isLoading"
      :tableBtns="tableBtns"
      @rowClick="listRowClick"
    ></custom-table>
  </div>
</template>

<script type="text/ecmascript-6">
import customTable from '@/components/table';
import { mapGetters } from 'vuex';
export default {
  data ()
  {
    return {
      collapseObj: {
        width: 260,
        draggable: true,
        collapsable: true
      }
    };
  },
  components: {
    customTable
  },
  methods: {
    listRowClick ({ row, event, column })
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK/show', {id: row.id});
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK', [
      'tableList', // 涵洞经常性检查表格list
      'tableBtns', // 表格功能按钮
      'gridEntityInfo', // 表头
      'listGridColumnInfo', // 表头列
      // 'navigateMenus', // 导航栏按钮
      // 'operateBtns', // 功能按钮
      'isLoading' // 动画加载
    ])
  }
};
</script>

<style scoped lang="less">
  @import '../../../../common/less/common';
</style>
