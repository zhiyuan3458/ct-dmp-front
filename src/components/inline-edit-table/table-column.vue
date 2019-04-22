<template>
  <el-table-column
    :min-width="`${col.colWidth}`"
    :prop="col.code"
    :label="col.name"
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
        v-if="item.isHide === '0'"
      >
      </table-column>
    </template>
    <template slot-scope="scope">
      <el-form-item label="" :prop="col.code">
        <related-form-component
          :value.sync="scope.row[col.code]"
          :type="col.type"
          :code="col.codeValue"
          v-on="$listeners"
          v-bind="$attrs"
          :options="options"
        >
        </related-form-component>
      </el-form-item>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
import relatedFormComponent from '@/components/related-form-component';
import { getDictionaryData } from '@/api/common/common';
export default {
  name: 'tableColumn',
  components: {
    relatedFormComponent
  },
  data ()
  {
    return {
      options: ''
    };
  },
  props: {
    col: {
      type: Object
    }
  },
  created ()
  {
    this.getDictionaryData();
  },
  methods: {
    /**
     * 从数据字典中获取下拉，单选复选的选项
     */
    getDictionaryData ()
    {
      if (!this.col.type) return false;
      const type = this.col.type.toLowerCase();
      if (type !== 'date' && type !== 'input' && type !== 'textarea' && type !== 'attachment')
      {
        getDictionaryData(this.col.codeValue).then(({ data }) =>
        {
          this.options = JSON.stringify(data.data);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.text {
  width: 100%;
  height: 100%;
  display: inline-block;
}
/deep/ .el-input__inner {
  height: 25px;
  line-height: 25px;
}
</style>
