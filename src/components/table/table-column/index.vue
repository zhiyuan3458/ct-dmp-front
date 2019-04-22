<template>
  <el-table-column
    v-if="col.title !== '图标'"
    :min-width="col.width"
    :prop="col.name"
    :label="col.title"
    :show-overflow-tooltip="true"
    :align="col.align"
    :sortable="col.sort"
    header-align="center"
  >
    <template v-if="col.children && col.children.length > 0">
      <table-column
        v-for="item in col.children"
        :key="item.id"
        :col="item"
      >
      </table-column>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :show-overflow-tooltip="true"
    :min-width="col.width"
    :prop="col.name"
    :label="col.title"
    :align="col.align"
    :sortable="col.sort"
    header-align="center"
  >
    <template slot-scope="scope">
      <span :class="scope.row.icon"></span>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'tableColumn',
  props: {
    col: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>

</style>
