<template>
  <div class="table-wrapper"  ref="tableWrapper">
    <!-- 可拉伸导航栏 -->
    <collapse-bar class="collapse-bar" :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft">
      <!-- 按钮工具栏 -->
      <div slot="header" class="top">
        <div class="group" v-for="(item, index) in iconContent" :key="index">
          <a
            :class="item.iconClass"
            @click="clickTopBtn"
          ></a>
          <img src="./img/resultset_down.png" v-if="!item.iconClass.indexOf('icon-expand-tree')" style="cursor: pointer;" alt="">
        </div>
      </div>
      <!-- 树形结构工具栏 -->
      <div slot="content" class="form-bar-content-wrapper">
        <el-form ref="form" :model="stone" label-width="50px">
          <el-form-item label="路线" prop="roadLine">
            <el-input class="formBarTable-input" v-model="stone.roadLine" placeholder="请输入路线"></el-input>
          </el-form-item>
          <el-form-item label="车道" prop="roadway">
            <el-select v-model="stone.roadway" placeholder="请选择车道">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-select v-model="stone.direction" placeholder="请选择方向">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" props="date">
            <el-date-picker
              v-model="stone.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm1()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </collapse-bar>
    <div class="lzy-table-wrapper" :style="{marginLeft: marginLeft + 'px'}" v-if="lzyTableWrapperShow">
      <div class="tool-wrapper" ref="toolWrapper">
        <!-- 按钮组 -->
        <div class="btn-group" ref="btnGroup">
          <el-button size="mini" icon="el-icon-plus" @click="clickAddBtn">新增</el-button>
          <el-button size="mini" icon="el-icon-delete" @click="handleDel" :disabled="this.multipleSelection.length === 0">删除</el-button>
          <el-button size="mini" icon="el-icon-upload2">导入</el-button>
          <el-button size="mini" icon="el-icon-download">导出</el-button>
        </div>
        <!-- 导航位置 -->
        <div class="nav-bar" ref="navBar">
          <el-breadcrumb separator-class="el-icon-minus">
            <el-breadcrumb-item><span class="el-icon-star-on"></span>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table-container" slot="table">
        <div class="table-title">国家法律</div>
        <el-table
          :data="tableData"
          size="mini"
          border
          :height="tableMaxHeight"
          :header-cell-class-name="setTableHeadBackground"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            label="法律名称"
            header-align="center"
          ></el-table-column>
          <el-table-column
            prop="effectiveTime"
            label="生效时间"
            header-align="center"
          ></el-table-column>
          <el-table-column
            prop="uploadTime"
            label="上传时间"
            header-align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <i class="el-icon-search" @click="clickCheckBtn(scope.$index, scope.row)" style="color: #4BAAD0;cursor:pointer;"></i>
              <i class="el-icon-edit" @click="clickEditBtn(scope.$index, scope.row)" style="color: #F59C00;cursor:pointer;"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagenation-wrapper">
          <input type="text" class="search-input" v-model="search" placeholder="请输入查询内容">
          <span class="el-icon-search"></span>
          <el-pagination
            class="pagenation1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100, 200, 500 ,1000, 10000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 左边树形伸缩菜单，右边列表的页面
 * @author lvzhiyuan
 * @date   2018/6/1
 */
import { mapGetters } from 'vuex';
import collapseBar from '@/components/collapseBar';
import { getLawData, remove, addEdit, saveOrUpdate } from '@/api/roadMaintenanceSystem/gfbzgl/standardApi';

export default {
  components: {
    collapseBar
  },
  data ()
  {
    const collapsedWrapperWidth = 260;
    const lzyTableMarginLeft = collapsedWrapperWidth + 10;
    return {
      stone: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // 可伸缩的导航栏
      collapsedWrapper: {
        width: collapsedWrapperWidth, // 设置初始宽度
        draggable: true, // 是否可拖拽
        collapsable: true // 是否可伸缩
      },
      iconContent: [
        {
          iconClass: 'icon-expand-tree icon',
          text: ''
        },
        {
          iconClass: 'icon-collapse-tree icon',
          text: ''
        }
      ],
      expandShow: true, // 默认树是展开的
      // 树的数据
      nodeId: '', // 节点的id
      treeData: [],
      collapsedWrapperMarginLeft: 0,
      /* lzyTableWrapper是否显示 */
      lzyTableWrapperShow: false,
      // table和tool和分页的参数
      toolShow: true,
      marginLeft: lzyTableMarginLeft,
      lzyTableWrapperHeight: 0,
      // table的参数
      tableMaxHeight: 0,
      loading: false,
      tableHeaderClass: 'table-title',
      tableData: [],
      setTableHeadBackground: 'table-title-class',
      currentPage: 1,
      pageSize: 50,
      search: '',
      // 表格复选框选中后的数据
      multipleSelection: [],
      // 查看框的属性设置
      checkWrapperShow: false,
      checkInfo: {
        title: '',
        effectiveTime: '',
        uploadTime: ''
      },
      // 新增框的属性设置
      /* modal参数 */
      modalShow: false,
      modalTitle: '',
      iconClass: '',
      // 是否显示工具栏，uploader的上传按钮和删除图标
      modalToolShow: false,
      readonly: false,
      contentWrapperHeight: 0,
      /* 传递到后台的参数对象 */
      itemId: '',
      form: {},
      /* editForm */
      editFormShow: false,
      editForm: {},
      /* 上传组件 */
      params: {
        sessionId: ''
      }
    };
  },
  methods: {
    submitForm1 ()
    {
      let obj = {
        dictionaryId: '402819816381678e016381ce9770002b',
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.lzyTableWrapperShow = true;
      getLawData(obj).then(res =>
      {
        this.loading = false;
        let code = res.data.code;
        if (code === this.ERR_OK)
        {
          this.tableData = res.data.data;
        }
      });
    },

    // 递归获取图标
    // src/pages/roadMaintenanceSystem/lzyTableWrapper/img/law2.png
    getIcon (data)
    {
      if (Array.isArray(data))
      {
        data.forEach(item =>
        {
          if (item.children)
          {
            item.icon = require(`@/${item.icon}`);
            this.getIcon(item.children);
          }
          else
          {
            item.icon = require(`@/${item.icon}`);
          }
        });
      }
    },
    // 通过CollapseBar子组件的getLzyTableWrapperMarginLeft事件传递子组件一个参数给父组件，从而求出tableWrapper的marginLeft
    // 这是vue的子组件传递给父组件一种方法
    getLzyTableWrapperMarginLeft (...data)
    {
      this.marginLeft = data[0].left + 10;
    },
    // 点击侧导航栏的上部图标触发
    clickTopBtn (e)
    {
      let iconClass = e.target.className;
      if (iconClass.indexOf('el-icon-back') >= 0)
      {
        return false;
      }
      else if (iconClass.indexOf('icon-folder-open') >= 0)
      {
        this.expandShow = true;
      }
      else
      {
        this.expandShow = false;
      }
    },

    /**
     * 根据dictionaryId，pageNum，pageSize获取列表信息
     * @author lvzhiyuan
     * @api    getRoadData
     * @date   2018/06/01
     * @param  obj——包括了dictionaryId，pageNum，pageSize三个属性
     * @return promise对象，用then(res => {})解析promise并输出res
     */
    getTableData ()
    {
      let obj = {
        dictionaryId: this.nodeId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      getLawData(obj).then(res =>
      {
        this.loading = false;
        let code = res.data.code;
        if (code === this.ERR_OK)
        {
          this.tableData = res.data.data;
        }
      });
    },

    /**
     * 点击伸缩栏的树形节点, 生成列表数据
     * @author  lvzhiyuan
     * @date    2018/6/1
     * @param   event——点击的事件信息
     * @param   treeId——树的id
     * @param   treeNode——封装了被点中的节点的信息的对象
     * @return
     */
    handleCollapseBarTreeClick (event, treeId, treeNode)
    {
      this.loading = true;
      this.lzyTableWrapperShow = true;
      this.nodeId = treeNode.id;
      this.getTableData();
    },

    // 右内容table的方法
    // 选中复选框的数据
    /**
     * 选中复选框的数据后触发，把选中的数据给到multipleSelection属性
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    val——数组，元素为被勾选的对象
     */
    handleSelectionChange (val)
    {
      this.multipleSelection = val;
    },
    /**
     * 删除列表的内容
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    handleDel ()
    {
      this.$confirm('此操作将永久删除该列表项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.loading = true;
        // 获取到所有的要删除的id并整合成用逗号分隔的格式
        let removeIds = this.multipleSelection.map(item => item.id).join(',');
        remove(removeIds).then(res =>
        {
          let code = res.data.code;
          if (code === this.ERR_OK)
          {
            this.getTableData();
          }
        });
      });
    },
    /**
     * 点击列表最下面的一页显示多少条按钮触发
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    handleSizeChange (val)
    {
      this.loading = true;
      /* let obj = {
        dictionaryId: this.nodeId,
        pageNum: this.currentPage,
        pageSize: val
      }; */
      this.getTableData();
    },
    /**
     * 点击分页选项卡获取不同页面信息
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    val——要跳转的页面
     */
    handleCurrentChange (val)
    {
      this.loading = true;
      /* let obj = {
        dictionaryId: this.nodeId,
        pageNum: val,
        pageSize: this.pageSize
      }; */
      this.getTableData();
    },

    /**
     * 显示查看框内容
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    index——表示该条数据在列表项中第几行
     * @param    row——对象，表示该行数据的全部信息
     */
    clickCheckBtn (index, row)
    {
      this.modalShow = true;
      this.modalToolShow = false;
      this.iconClass = 'el-icon-search';
      this.modalTitle = '查看';
      this.readonly = true;
      this.$store.dispatch('toggleModalBgShow', true);
      let { id } = row;
      this.itemId = id;
      //      addEdit(id).then(res => {
      //        let code = res.data.code;
      //        if (code === this.ERR_OK) {
      //          this.form = res.data.data;
      //          if (res.data.data.attachmentVOlist !== null) {
      //            this.fileList = res.data.data.attachmentVOlist;
      //          } else {
      //            this.fileList = [];
      //          }
      //        }
      //      });
    },
    /**
     * 点击查看框的返回按钮返回列表页
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    handleCheckWrapperBackBtn ()
    {
      this.checkWrapperShow = false;
    },
    /**
     * 重置表单
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    formName——表单的ref属性值
     */
    resetForm ()
    {
      this.$refs.modal.resetModalForm();
    },
    /**
     * 更新编辑表单的文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    id——被点击编辑按钮的行的id
     */
    refreshFiles (id)
    {
      addEdit(id).then(res =>
      {
        let attachmentVOlist = res.data.data.attachmentVOlist;
        this.editFileList = attachmentVOlist;
      });
    },
    /**
     * 点击每行的编辑按钮编辑列表项的内容
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    index——表示该条数据在列表项中第几行
     * @param    row——对象，表示该行数据的全部信息
     */
    clickEditBtn (index, row)
    {
      this.resetForm();
      this.readonly = false;
      this.modalToolShow = true;
      this.iconClass = 'el-icon-edit';
      this.modalTitle = '编辑';
      this.modalShow = true;
      let { id } = row;
      this.itemId = id;
      //      addEdit(id).then(res => {
      //        let data = res.data.data;
      //        if (data.attachmentVOlist !== null) {
      //          this.fileList = res.data.data.attachmentVOlist;
      //        } else {
      //          this.fileList = [];
      //        }
      //        this.params.sessionId = res.data.data.sessionId;
      //        // 把返回的attachmentVOlist去掉，不放在editForm里
      //        this.form = res.data.data;
      //        Object.keys(this.form).forEach(item => {
      //          if (item === 'attachmentVOlist') {
      //            delete this.form[item];
      //          } else {
      //            this.form[item] = data[item];
      //          }
      //        });
      //      });
    },
    /**
     * 点击编辑框的返回按钮触发
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    clickEditBack ()
    {
      this.modalShow = false;
      this.$store.dispatch('toggleModalBgShow', true);
    },
    /**
     * 编辑表单的文件上传处理
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    res——返回的响应
     */
    handleEditUpload (res)
    {
      this.refreshFiles(this.form.id);
    },
    // 新增表格的方法
    /**
     * 点击新增按钮获取sessionId
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @return   sessionId
     */
    clickAddBtn ()
    {
      this.resetForm();
      this.readonly = false;
      this.modalToolShow = true;
      this.iconClass = 'el-icon-circle-plus';
      this.modalTitle = '新增';
      this.modalShow = true;
      this.itemId = '';
      this.$store.dispatch('toggleModalBgShow', true);
      //      addEdit('').then(res => {
      //        let code = res.data.code;
      //        if (code === this.ERR_OK) {
      //          this.form = res.data.data;
      //          this.params.sessionId = res.data.data.sessionId;
      //        }
      //      });
    },
    /**
     * 新增框提交新增文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    fileObj——将要上传的文件
     */
    //    handleUpload (files) {
    //      this.fileList = this.fileList.concat(files);
    //    },
    /**
     * 删除新增框的文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    id——将被删除的id
     */
    //    deleteFile (id) {
    //      this.fileList.remove(this.fileList.find(item => item.id === id));
    //    },

    /**
     * 删除对象中属性值为null的对象
     * @author   lvzhiyuan
     * @date     2018/6/7
     * @param    obj——需要删除属性的对象
     */
    removeObjKey (obj)
    {
      Object.keys(obj).forEach(item =>
      {
        if (obj[item] === null)
        {
          delete obj[item];
        }
      });
    },
    /**
     * 提交新增框的表单
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    formName——新增框的ref属性
     */
    submitForm (formName)
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs[formName].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            // id为空说明是新增的
            if (this.form.id === '')
            {
              this.removeObjKey(this.form);
              obj = Object.assign({}, this.form, {
                dictionaryId: this.nodeId,
                sortOrder: 1
              });
            }
            else
            {
              obj = this.form;
            }
            this.loading = true;
            saveOrUpdate(obj).then(res =>
            {
              let code = res.data.code;
              if (code === this.ERR_OK)
              {
                this.modalShow = false;
                this.getTableData(obj);
              }
            });
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 点击新增框“返回”按钮返回列表页
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    clickFormBack ()
    {
      this.modalShow = false;
    },
    /**
     * 下载文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    id——要下载的文件id
     */
    downloadFile (id)
    {
      window.open(`/upload/sys/at/attachment/download?id=${id}`);
    },
    /**
     * 删除编辑框的文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     */
    deleteEditFile ()
    {
      this.refreshFiles(this.editForm.id);
    }
  },
  computed: {
    ...mapGetters([
      'sideBar'
    ]),
    opened ()
    {
      return this.sideBar.opened;
    }
  },
  watch: {
    opened ()
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      if (this.opened)
      {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.toolWrapper.offsetHeight - 38 - 36;
      }
      else
      {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.toolWrapper.offsetHeight - 38 - 36;
      }
    }
  },
  created ()
  {
    this.$nextTick(() =>
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      this.tableMaxHeight = document.body.offsetHeight - 209;
      this.lzyTableWrapperHeight = document.body.offsetHeight - 209;
      /* 新增框和编辑框的内容高度 */
      this.contentWrapperHeight = document.body.offsetHeight - 120;
    });
  }
};
</script>

<style lang="less" scoped>
@import "./lzyTableWrapper";

.table-wrapper {
  height: 100%;
  /* 伸缩导航的样式 */
  .collapse-bar{
    .top {
      border-bottom: 1px solid #ddd;
      height: 29px;
      overflow: hidden;

      .group {
        float: left;
        margin-left: 0;
        padding-right: 12px;
        padding-left: 12px;
        position: relative;
        border-right: 1px solid #ddd;
        .icon {
          height: 23px;
          line-height: 23px;
          color: #000;
          cursor: pointer;
          padding-left: 20px;
          text-decoration: none;
          height: 23px;
          line-height: 23px;
          float: left;
        }

        .icon-return {
          background: url('./img/go-back.png') no-repeat;
        }

        .icon-expand-tree {
          background: url('./img/expandTree.png') no-repeat;

          &:after {
            content: '';
          }
        }

        .icon-collapse-tree {
          background: url('./img/collapseTree.png') no-repeat;
        }
      }
    }

    .form-bar-content-wrapper {
      margin-top: 10px;
      .el-form-item__label, .el-form-item__content {
        line-height: 40px;
      }
      input {
        width: 180px;
        height: 28px;
      }
      .el-input__icon {
        line-height: inherit;
      }
      .formBarTable-button {
        height: 28px;
        line-height: 3px;
        padding: 7px 13px;
      }
    }
  }
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

        .el-breadcrumb__inner {
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

      .has-gutter tr th {
        color: #333;
        font-size: 12px;
        font-weight: bold;
        background: #F9E7CD!important;
      }

      .cell {
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

        .pagenation1 {
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
}

.form-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  background: white;
  box-sizing: border-box;
  padding: 1px;

  .title-wrapper {
    color: white;
    background: dodgerblue;
    height: 32px;
    overflow: hidden;
    line-height: 32px;

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
  .fixed-container {
    border: 1px solid #ddd;
    border-top: 0;
    padding: 0 5px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
    /* 工具栏 */
    .fix-wrapper {
      width: calc(100% - 338px);
      position: fixed;
      padding-top: 4px;
      z-index: 1000;
      background: white;
      .btn-group {
        padding:0 0 5px 8px;
        border-bottom: 1px solid #ddd;
      }
    }
    /* 修正fixed后的bug */
    .hack-fixed {
      opacity: 0;
      height: 41px;
      z-index: 1;
    }
    .el-tabs--border-card>.el-tabs__content {
      padding : 6px 0 0 5px;
    }
  }
}
</style>
