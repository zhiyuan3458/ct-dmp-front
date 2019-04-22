<template>
  <div class="lzy-table-wrapper" v-if="isListShow">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      :tableBtns="tableBtns"
      ref="rightNavLayout"
    ></right-nav-layout>
    <div class="table-container" slot="table">
      <div class="table-title">列表信息</div>
      <el-table
        :data="tableList.listData"
        size="mini"
        border
        :height="tableMaxHeight"
        :header-cell-class-name="style.setTableHeadBackground"
        @selection-change="handleSelectionChange"
        v-loading="isLoading"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名称"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="userAccount"
        label="用户账号"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="docIndex"
        label="索引"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="context"
        label="内容"
        header-align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <i v-for="item in $refs.rightNavLayout.metaData.tableBtns"
             :key="item.id"
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
        <el-select class="search-input" v-model="indexValue" placeholder="请选择索引" @change="indexSelect">
          <el-option
            v-for="item in indexList"
            :key="item.docIndex"
            :label="item.docIndex"
            :value="item.docIndex">
          </el-option>
        </el-select>
        <el-select class="search-input" v-model="typeValue" placeholder="请选择类型"  @change="typeSelect">
          <el-option
            v-for="item in typeList"
            :key="item.type"
            :label="item.type"
            :value="item.type">
          </el-option>
        </el-select>
        <input type="text" class="search-input" v-model="metaData.search" placeholder="请输入查询内容" @input="handleSearch">
        <span class="el-icon-search"></span>
        <el-pagination
          class="pagenation"
          v-if="tableList.listData"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableList.pageNum"
          :page-sizes="[10, 20, 50, 100, 200, 500 ,1000, 10000]"
          :page-size="tableList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
export default {
  components: {
    rightNavLayout
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
        pageSize: 50,
        search: '',
        multipleSelection: [], // 表格复选框选中后的数据
        treeNodeCode: ''
      },
      indexValue: '',
      typeValue: ''
    };
  },
  methods: {
    addFn ()
    {
      this.$store.dispatch('backStageSystem/_SEARCH/addEdit', '');
    },
    showFn (row)
    {
      this.$store.dispatch('backStageSystem/_SEARCH/addEdit', {id: row.id});
    },
    editFn (row)
    {
      this.$store.dispatch('backStageSystem/_SEARCH/addEdit', {id: row.id});
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
          this.indexValue = null;
          this.typeValue = null;
          this.$store.dispatch('backStageSystem/_SEARCH/remove', {
            docIndex: this.multipleSelection[0].docIndex,
            type: this.multipleSelection[0].type,
            id: this.multipleSelection[0].id,
            pageNum: this.tableList.pageNum,
            pageSize: this.tableList.pageSize
          });
        });
      }
    },
    /**
     * 索引下拉框发生变化时，搜索得到对应的类型值及对应的所有文档数据
     * @author   yekuncai
     * @date     2018/10/12
     */
    indexSelect (val)
    {
      // this.$store.dispatch('backStageSystem/_SEARCH/searchTypeByIndex', val);
      this.typeValue = null;
      this.$store.dispatch('backStageSystem/_SEARCH/searchTypeByIndex', {
        indexValue: val,
        pageNum: this.tableList.pageNum,
        pageSize: this.tableList.pageSize
      });
    },
    /**
     * 类型下拉框发生变化时，搜索得到对应的所有文档数据
     * @author   yekuncai
     * @date     2018/10/12
     */
    typeSelect (val)
    {
      this.$store.dispatch('backStageSystem/_SEARCH/searchData', {
        indexValue: this.indexValue,
        typeValue: val,
        pageNum: this.tableList.pageNum,
        pageSize: this.tableList.pageSize
      });
    },
    /**
     * 搜索文档
     * @author   yekuncai
     * @date     2018/10/12
     */
    handleSearch (val)
    {
      if (val.data.length !== 0)
      {
        this.$store.dispatch('backStageSystem/_SEARCH/searchData', {
          indexValue: this.indexValue,
          typeValue: this.typeValue,
          otherValue: val,
          pageNum: this.tableList.pageNum,
          pageSize: this.tableList.pageSize
        });
      }
    },
    /**
     * 复选框选定
     * @author   yekuncai
     * @date     2018/10/16
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 一页显示多少条
     * @author   yekuncai
     * @date     2018/10/16
     */
    handleSizeChange (size)
    {
      this.$store.dispatch('backStageSystem/_SEARCH/listJson', {
        value: this.search,
        pageNum: this.tableList.pageNum,
        pageSize: size
      });
    },
    /**
     * 页面跳转
     * @author   yekuncai
     * @date     2018/10/16
     */
    handleCurrentChange (currentPage)
    {
      console.log(currentPage);
      this.$store.dispatch('backStageSystem/_SEARCH/listJson', {
        value: this.search,
        pageNum: currentPage,
        pageSize: this.tableList.pageSize
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_SEARCH', [
      'marginLeft',
      'sideBar',
      'tableList',
      'indexList',
      'typeList',
      'tableBtns',
      'navigateMenus',
      'operateBtns',
      'isListShow',
      'search',
      'saveOrUpdateValue',
      'isLoading'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    },
    /**
     * 列表高度随着系统栏的隐藏展示而变化
     * @author   yekuncai
     * @date     2018/10/16
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
    search (newValue, oldValue)
    {
      this.$store.dispatch('backStageSystem/_SEARCH/listJson', {
        pageNum: this.metaData.currentPage,
        pageSize: this.metaData.pageSize
      });
    },
    saveOrUpdateValue (newValue, oldValue)
    { // 刷新table列表
      if (newValue !== null && newValue !== '')
      {
        this.indexValue = null;
        this.typeValue = null;
        this.$store.dispatch('backStageSystem/_SEARCH/listJson', {
          value: newValue,
          pageNum: this.metaData.currentPage,
          pageSize: this.metaData.pageSize
        });
      }
    }
  },
  created ()
  {
    this.$store.dispatch('backStageSystem/_SEARCH/showList', '1234');
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
  /* table的样式 */
  .lzy-table-wrapper {
    height: 100%;
    padding: 0 0 5px 2px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;

    .tool-wrapper {
      .btn-group {
        padding: 4px 0;
        border-bottom: 1px solid #ddd;

        .el-icon-back {
          color: #5CC48F;
          font-weight: 700;
        }

        .el-icon-plus {
          color: #D85C0D;
          font-weight: 700;
        }

        .el-icon-delete {
          color: #DC3F2C;
          font-weight: 700;
        }

        .el-icon-upload2 {
          color: #217FBC;
          font-weight: 700;
        }

        .el-icon-download {
          color: #2FA2E0;
          font-weight: 700;
        }
      }

      .nav-bar {
        display: inline-block;
        margin: 5px 0;
        .content;

        .el-icon-star-on {
          display: inline-block;
          margin-right: 5px;
          color: #F59C00;
        }

        /deep/ .el-breadcrumb__inner {
          font-family: "宋体";
          color: #333;
          font-size: 12px;
          font-weight: 100 !important;
        }
      }
    }

    .table-container {
      .table-title {
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
        color: #333;
        font-size: 12px;
        font-weight: bold;
        background: #F9E7CD!important;
      }

      /deep/ .cell {
        .content;
        text-align: center;
        line-height: 18px;
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

    /* 查看框 */
    .check-wrapper {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      background: white;

      .btn-group {
        width: 100%;
        position: fixed;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;

        .el-button--mini, .el-button--mini.is-round {
          padding: 6px;
        }

        .el-icon-success {
          color: #67C23A;
          font-weight: 700;
        }

        .el-icon-arrow-left {
          color: #409EFF;
          font-weight: 700;
        }
      }

      .check-title {
        margin-top: 40px;
        display: flex;
        align-items: center;

        .basic-info-text {
          display: inline-block;
          color: #fff;
          background-color: #56A2E8;
          border: 1px solid #56A2E8;
          padding: 6px 5px;
        }

        .line {
          flex: 1;
          border-bottom: 0.1rem solid rgba(0,0,0,0.2);
        }
      }

      .check-content {
        display: table;
        width: calc(100% - 24px);
        margin: 0 auto;
        border: 1px solid #DCEBF7;
        margin-top: 20px;

        .check-list-row {
          display: table-row;
          line-height: 1.5;
          .check-list-item-title {
            display: table-cell;
            color: #336199;
            background-color: #EDF3F4;
            text-align: right;
            padding: 6px 10px 6px 4px;
            font-weight: 400;
            width: 110px;
            vertical-align: middle;
          }
          .check-list-item-content {
            display: table-cell;
            padding: 6px 4px 6px 12px;
            border-bottom: 1px dashed #ddd;
          }
        }
      }
    }

    /* 新增和编辑框 */
    .addForm-wrapper, .editForm-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      background: white;
      box-sizing: border-box;
      padding: 10px;

      .title-wrapper {
        color: white;
        background: dodgerblue;
        height: 40px;
        overflow: hidden;
        line-height: 40px;

        h2.title {
          float: left;
          margin-left: 10px;
          .title;
        }

        .el-icon-close {
          float: right;
          cursor: pointer;
          margin: 10px 10px 0 0;
        }
      }

      /* 内容项 */
      .content-wrapper {
        border: 1px solid #ddd;
        border-top: 0;
        padding: 0 5px;
        box-sizing: border-box;
        overflow: hidden;
        overflow-y: auto;
        /* 工具栏 */
        .fix-wrapper {
          width: calc(100% - 360px);
          position: fixed;
          padding-top: 8px;
          z-index: 1000;
          background: white;
          .btn-group {
            padding:0 0 8px 8px;
            border-bottom: 1px solid #ddd;

            .el-button--mini, .el-button--mini.is-round {
              padding: 6px;
            }

            .el-icon-success {
              color: #67C23A;
              font-weight: 700;
            }

            .el-icon-arrow-left {
              color: #409EFF;
              font-weight: 700;
            }

            .el-icon-printer {
              color: #F56C6C;
              font-weight: 700;
            }
          }
        }
        /* 修正fixed后的bug */
        .hack-fixed {
          opacity: 0;
          height: 50px;
          z-index: 1;
        }
        /* 表单 */
        .form-wrapper {
          border: 1px solid orange;
          border-radius: 5px;
          margin: 10px 5px;
          position: relative;

          .title {
            line-height: 20px;
            background: white;
            color: #333;
            position: absolute;
            top: -15px;
            left: 15px;
            padding: 5px;
          }
          .lzy-main-content {
            width: 98%;
            text-align: left;
            padding: 20px 10px 10px 20px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 5px;

            .double-form-group {
              display: flex;
              .el-form-item {
                flex: 1;
              }

              .data-picker {
                width: 100%;
                .el-input__inner {
                  padding-right: 0;
                }
              }
            }

            .single-form-group {
              .data-picker {
                width: 100%;
                .el-input__inner {
                  padding-right: 0;
                }
              }
            }

            .upload-wrapper {
              width: 90%;
              height: 300px;
              padding: 10px;
              margin-top: 20px;
              border: 1px solid #ddd;
            }

            .pn-ftable {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
