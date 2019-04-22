<template>
  <div class="inline-edit-table-container">
    <h2 class="child-table-header" v-if="title !== ''">{{title}}</h2>
    <el-table
      :data="dataInfo"
      size="mini"
      border
      header-cell-class-name="cell-class"
      cell-class-name="cell-class"
      @selection-change="handleSelectionChange"
      ref="customTable"
      :show-header="isShowHeader"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        v-if="!readonly && isMinus"
        label=""
        width="55">
        <template slot-scope="scope">
          <span class="ct-icon-minus1-red" @click="handleDelete(scope.row, scope.$index)"></span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isIndex"
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="isShowCheckbox && !readonly"
        type="selection"
        width="50">
      </el-table-column>
      <table-column
        v-for="(item, index) in constructInfo"
        :key="index"
        :col="item"
        :readonly="readonly || Boolean(Number(item.isReadOnly))"
        v-if="item.isHide === '0'"
        @change="handleChange"
      >
      </table-column>
    </el-table>
    <div class="add-wrapper" v-if="!readonly && isAdd">
      <span class="icon ct-icon-add-green" @click="handleAdd"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import tableColumn from './table-column';
import { postHttp } from '@/api/util';
import { getBridgeData } from '@/api/common/common';
export default {
  components: {
    tableColumn
  },
  data ()
  {
    return {
      /* 数据源 */
      dataInfo: this.initDataInfo ? JSON.parse(this.initDataInfo) : [],
      optionGroup: {},
      /* 表头数据 */
      constructInfo: []
    };
  },
  props: {
    /* 标题 */
    title: {
      type: String,
      default: ''
    },
    /* 是否显示表头 */
    isShowHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示减号
     * 默认显示
     */
    isMinus: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示加号
     * 默认显示
     */
    isAdd: {
      type: Boolean,
      default: true
    },
    /* 是否只读 */
    readonly: {
      type: Boolean,
      default: false
    },
    /* 是否显示序号行 */
    isIndex: {
      type: Boolean,
      default: false
    },
    /* 是否显示checkbox框 */
    isShowCheckbox: {
      type: Boolean,
      default: false
    },
    /* 获取表头的关键字 */
    relatedTableCode: {
      type: String,
      default: ''
    },
    /* 列表的数据 */
    initDataInfo: {
      type: String,
      default: ''
    },
    /* 点击删除按钮时传到后台的url */
    deleteUrl: {
      type: String,
      default: ''
    },
    /* 合并行列方法 */
    objectSpanMethod: {
      type: Function
    }
  },
  watch: {
    initDataInfo: {
      handler (newVal, oldVal)
      {
        this.dataInfo = [];
        this.initData();
        if (newVal)
        {
          this.dataInfo = JSON.parse(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    handleChange ()
    {
      this.$emit('change', this.dataInfo);
    },
    /* 初始化数据 */
    initData ()
    {
      getBridgeData(this.relatedTableCode).then(({ data }) =>
      {
        this.constructInfo = data.data;
      });
    },
    /**
     * 用来设置高亮颜色
     * @author   lvzhiyuan
     * @date     2018/12/21
     * @param row
     * @param rowIndex
     * @returns {{background-color: string}}
     */
    rowClass ({ row, rowIndex })
    {
      let arr = [];
      let list = this.dataInfo;
      this.selectedGroup.forEach(item =>
      {
        arr.push(list.findIndex(childItem => childItem.id === item.id));
      });
      if (arr.includes(rowIndex))
      {
        return { 'background-color': '#FFECB1' };
      }
    },
    /**
     * 复选框选定
     * @author   lvzhiyuan
     * @date     2018/12/21
     */
    handleSelectionChange (val)
    {
      this.selectedGroup = val;
    },
    /**
     * 新增一行
     */
    handleAdd ()
    {
      let obj = {};
      this.constructInfo.forEach(item =>
      {
        obj[item.code] = '';
      });
      this.dataInfo.push(obj);
      this.$emit('change', this.dataInfo);
    },
    /**
     * 删除一行
     */
    handleDelete (item, index)
    {
      let id = item.id;
      this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        postHttp(this.deleteUrl, { id }).then(_ =>
        {
          this.dataInfo.splice(index, 1);
          this.$emit('change', this.dataInfo);
        });
      }).catch(_ =>
      {});
    }
  }
};
</script>

<style lang="less" scoped>
/* 表头顶部背景 */
@table-title-bg-color: #56A2E8;
/* 表头背景 */
@table-head-bg-color: #F9E7CD;
/* 分页组件背景色 */
@pagenation-bg-color: #e1edf9;
.inline-edit-table-container {
  .child-table-header {
    background: #EDF6FC;
    text-align: left;
    padding: 5px 5px 5px 20px;
    font-family: '宋体';
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  /deep/ .el-table__empty-block {
    min-height: 1px;
    span {
      display: none;
    }
  }
  /deep/ .has-gutter {
    tr {
      th {
        height: 28px;
        color: #333;
        font-size: 12px;
        font-weight: bold;
        background: @table-head-bg-color!important;
        padding: 0;
      }
    }
  }

  /deep/ .el-input__inner {
    height: 25px !important;
    line-height: 25px !important;
    border-radius: 3px;
    font-size: 12px;
  }
  /deep/ .el-select .el-input__suffix {
    top: 0px;
    .el-select__caret {
      line-height: 25px;
    }
  }
  /deep/ .el-date-editor--date .el-input__prefix {
    top: -8px;
  }
  /deep/ .el-date-editor--date .el-input__suffix {
    top: -8px;
    right: 1px;
  }

  /deep/ .cell {
    width: auto!important;
    text-align: center;
    .content;
    line-height: 18px;
    .operate-btn {
      display: inline-block;
      margin-right: 7px;
      font-size: 16px;
      cursor: pointer;
    }
  }
  /deep/ .el-tooltip.cell {
    padding: 0;
  }
  .ct-icon-minus1-red {
    cursor: pointer;
  }
  .add-wrapper {
    width: 100%;
    .icon {
      display: inline-block;
      font-size: 17px;
      margin-top: 5px;
      margin-left: 17px;
      cursor: pointer;
    }
  }
}
/deep/ .el-tooltip {
  overflow: inherit;
}
/deep/ .cell-class {
  padding: 5px;
  border-color: #bbb;
}
</style>
