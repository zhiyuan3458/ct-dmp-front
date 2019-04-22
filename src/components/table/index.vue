<template>
  <div class="table-container" slot="table" style="width: 100%">
    <div class="table-title">{{gridEntityInfo.title}}</div>
    <el-table
      :data="tableList.listData"
      size="mini"
      border
      :height="height || tableHeight"
      row-key="id"
      header-cell-class-name="cell-class"
      :row-style="rowClass"
      cell-class-name="cell-class"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      :span-method="objectSpanMethod"
      ref="customTable"
    >
      <el-table-column
        v-if="gridEntityInfo.showRowNumbers"
        type="index"
        :index="indexMethod"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="gridEntityInfo.showCheckbox"
        type="selection"
        reserve-selection
        width="50">
      </el-table-column>
      <table-column
        v-for="(item, index) in listGridColumnInfo"
        :key="index"
        :col="item"
      >
      </table-column>
      <el-table-column label="操作" :width="tableBtnsWidth" v-if="gridEntityInfo.showOperateColumn">
        <template slot-scope="scope">
          <i v-for="item in metaData.tableBtns"
             :key="item.id"
             class="operate-icon"
             :class="item.icon"
             :title="item.displayName"
             style="cursor: pointer"
             :style="{ color: item.color}"
             @click="item.fun(scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagenation-wrapper">
      <div class="search-wrapper">
        <input type="text" class="search-input" v-model="metaData.search" placeholder="请输入查询内容" @keyup.enter="search">
        <span class="el-icon-search" @click="search" title="搜索"></span>
      </div>
      <div class="sort-group" @click="handleChangePosition" v-if="prifixUrl !== ''">
        <span class="ct-icon-top1-green" name="top" title="置顶"></span>
        <span class="ct-icon-bottom1-red" name="bottom" title="置底"></span>
        <span class="ct-icon-up1-green" name="up" title="上移"></span>
        <span class="ct-icon-down1-red" name="down" title="下移"></span>
      </div>
      <el-pagination
        class="pagenation"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="metaData.currentPage"
        :page-sizes="[20, 50, 100, 200, 500 ,1000, 10000]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableList.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import tableColumn from './table-column';
import { mapGetters } from 'vuex';
import { postHttp } from '@/api/util';
export default {
  components: {
    tableColumn
  },
  data ()
  {
    return {
      cellClass: 'cell-class',
      metaData: {
        tableBtns: [],
        selectedGroup: [],
        search: '',
        _loading: false,
        // 防止狂按判断上移下移置顶置底按钮导致出错，点击一次只能等待请求完成再继续按
        flag: true,
        pageSize: 20,
        currentPage: 1
      }
    };
  },
  props: {
    height: {
      type: String
    },
    tableList:
      {
        type: Object,
        required: true,
        default: function ()
        {
          return {};
        }
      },
    gridEntityInfo:
      {
        type: Object,
        required: true,
        default: function ()
        {
          return {};
        }
      },
    tableBtns:
      {
        type: Array,
        default: function ()
        {
          return [];
        }
      },
    listGridColumnInfo:
      {
        type: Array,
        required: true,
        default: function ()
        {
          return [];
        }
      },
    prifixUrl: {
      type: String,
      default ()
      {
        return '';
      }
    },
    /* 合并行列方法 */
    objectSpanMethod: {
      type: Function
    }
  },
  computed: {
    ...mapGetters([
      'sideBar',
      'tableHeight'
    ]),
    tableBtnsWidth ()
    {
      if (this.metaData.tableBtns.length > 1)
      {
        return this.metaData.tableBtns.length * 40;
      }
      else
      {
        return 100;
      }
    }
  },
  watch: {
    /**
     * 解决elementUI的table删除数据不能恢复到上一页的bug
     * 即如果第二页只有一条数据，然后删除之后只停留在第二页，而没回到第一页
     */
    'metaData.currentPage' (newVal, oldVal)
    {
      if (this.tableList.listData.length === 0)
      {
        this.handleCurrentChange(newVal);
      }
    },
    tableBtns: {
      handler (newValue, oldValue)
      {
        if (newValue && newValue.length !== 0)
        {
          /* 清空所选的数组 */
          this.$nextTick(() =>
          {
            this.$refs.customTable.clearSelection();
          });
          for (let i = 0; i < newValue.length; i++)
          {
            let tableBtn = Object.assign({}, newValue[i], {
              fun: Reflect.get(this.$parent, newValue[i].displayValue + 'Fn')
            });
            this.metaData.tableBtns[i] = tableBtn;
          };
        }
      },
      immediate: true
    }
  },
  methods: {
    handleClick (name)
    {
      if (this.$parent)
      {
        Reflect.get(this.$parent, `${name}Fn`).call();
      }
    },
    /**
     * 复选框选定
     * @author   chenguang
     * @date     2018/11/10
     */
    handleSelectionChange (val)
    {
      this.metaData.selectedGroup = val;
      Reflect.get(this.$parent, `handleSelectionChange`).call(this, val);
    },
    /**
     * 一页显示多少条
     * @author   chenguang
     * @date     2018/11/10
     */
    handleSizeChange (size)
    {
      this.metaData.pageSize = size;
      Reflect.get(this.$parent, `handleSizeChange`).call(this, size);
    },
    /**
     * 页面跳转
     * @author   chenguang
     * @date     2018/11/10
     */
    handleCurrentChange (currentPage)
    {
      // this.metaData.currentPage = currentPage;
      Reflect.get(this.$parent, `handleCurrentChange`).call(this, currentPage);
    },
    /**
     * 点击上移下移置顶置底按钮时触发
     * @author   lvzhiyuan
     * @date     2018/11/28
     */
    handleChangePosition (e)
    {
      const name = e.target.getAttribute('name');
      const positionObj = this.$common.checkChangePositon(this.tableList.listData, this.metaData.selectedGroup, name);
      if (positionObj && positionObj.preId)
      {
        let obj = {
          type: name,
          id: this.metaData.selectedGroup[0].id,
          preId: positionObj.preId
        };
        if (this.metaData.flag)
        {
          this.metaData.flag = false;
          this.metaData._loading = true;
          postHttp(`${this.prifixUrl}/upDownRecord`, obj).then(() =>
          {
            this.metaData.flag = true;
            this.metaData._loading = false;
            let temp = this.tableList.listData.splice(positionObj.preIndex, 1, this.tableList.listData[positionObj.currentIndex]);
            this.tableList.listData.splice(positionObj.currentIndex, 1, temp[0]);
          });
        }
      }
    },
    /**
     * 点击搜索按钮搜索表格的关键字
     */
    search ()
    {
      this.metaData.currentPage = 1;
      Reflect.get(this.$parent, `searchFn`).call(this, this.metaData.search);
    },
    rowClass ({ row, rowIndex })
    {
      let arr = [];
      let list = this.tableList.listData;
      this.metaData.selectedGroup.forEach(item =>
      {
        arr.push(list.findIndex(childItem => childItem.id === item.id));
      });
      if (arr.includes(rowIndex))
      {
        return { 'background-color': '#FFECB1' };
      }
    },
    /**
     * 序号排列方法
     */
    indexMethod (index)
    {
      return index + (this.metaData.currentPage - 1) * this.metaData.pageSize + 1;
    },
    /**
     * 点击表格某一行触发
     */
    rowClick (row, event, column)
    {
      this.$emit('rowClick', {row, event, column});
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
  .table-container {
    /deep/ .table-title {
      width: 100%;
      height: 21px;
      line-height: 21px;
      padding: 5px 0;
      background: @table-title-bg-color;
      color: #fff;
      text-align: center;
      .title;
    }

    .table-title-class {
      background: #f9e7cd;
    }

    /deep/ .has-gutter tr th {
      height: 28px;
      color: #333;
      font-size: 12px;
      font-weight: bold;
      background: #F9E7CD!important;
      padding: 0;
    }

    /deep/ .cell {
      .content;
      text-align: center;
      line-height: 18px;
      .operate-icon {
        display: inline-block;
        margin-right: 7px;
        font-size: 16px;
      }
    }

    .el-icon-search, .el-icon-edit {
      font-size: 16px;
      margin-right: 5px;
    }

    .pagenation-wrapper {
      width: 100%;
      height: 38px;
      overflow: hidden;
      border: 1px solid #ddd;
      border-top: 0;
      border-bottom: 0;
      box-sizing: border-box;
      background: @pagenation-bg-color;

      .search-input {
        min-height: 23px;
        padding-left: 5px;
        display: inline-block;
        margin: 5px 0 0 10px;
        border: 1px solid #ddd;
      }

      .el-icon-search {
        color: #217FBC;
        cursor: pointer;
      }

      .pagenation {
        float: right;
        margin: 3px 5px 0 0;
      }
    }
  }
.search-wrapper {
  float: left;
}
.sort-group {
  width: 110px;
  margin: 9px 0 0 12px;
  display: flex;
  justify-content: space-around;
  float: left;
  span {
    display: inline-block;
    font-size: 16px;
    padding: 0 7px;
    border-left: 1px solid #ccc;
    cursor: pointer;
  }
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #FFECB1 !important;
}
</style>
