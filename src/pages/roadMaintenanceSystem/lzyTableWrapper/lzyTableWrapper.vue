<template>
<div class="table-wrapper"  ref="tableWrapper">
  <!-- 可拉伸导航栏 -->
  <collapse-bar class="collapse-bar" :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft">
      <!-- 按钮工具栏 -->
      <div slot="header" class="top">
        <div class="group">
          <a class="icon ct-icon-folder-collaspe" @click="clickTopBtn"></a>
        </div>
        <div class="group">
          <a class="icon ct-icon-folder-expand" @click="clickTopBtn"></a>
        </div>
      </div>
      <!-- 树形结构工具栏 -->
      <div slot="content">
        <ul id="treeDemo" class="ztree"></ul>
      </div>
  </collapse-bar>
  <div class="lzy-table-wrapper" :style="{marginLeft: marginLeft + 'px'}" v-if="lzyTableWrapperShow">
    <!--<div class="tool-wrapper" ref="toolWrapper">-->
    <!--&lt;!&ndash; 按钮组 &ndash;&gt;-->
      <!--<btnGroup :btnList="btnList" @handleClick="handleClick"></btnGroup>-->
    <!--&lt;!&ndash; 导航位置 &ndash;&gt;-->
    <!--<div class="nav-bar" ref="navBar">-->
      <!--<el-breadcrumb separator-class="el-icon-minus">-->
        <!--<el-breadcrumb-item><span class="el-icon-star-on"></span>首页</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
  <!--</div>-->
    <top-tool-bar
      :btnList="btnList"
      :breadcrumbs="breadcrumbs"
    ></top-tool-bar>
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
            class="pagenation"
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
        <!-- 模态框1 -->
       <modal
         ref="modal"
         :visible.sync="modalShow"
         :modalTitle="modalTitle"
         :contentWrapperHeight="contentWrapperHeight"
         :readonly="readonly"
         :iconClass="iconClass"
         :toolShow="modalToolShow"
         :itemId="itemId"
         :nodeId="nodeId"
         @submit="getTableData"
       ></modal>
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
import { getLawData, remove, addEdit, saveOrUpdate, getTree } from '@/api/roadMaintenanceSystem/gfbzgl/standardApi';
import uploader from '@/components/uploader';
import modal from './components/modal';
import topToolBar from '@/components/topToolBar';

export default {
  components: {
    collapseBar,
    uploader,
    modal,
    topToolBar
  },
  data ()
  {
    const collapsedWrapperWidth = 260;
    const lzyTableMarginLeft = collapsedWrapperWidth + 10;
    return {
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
      // 树的设置参数
      setting: {
        view: {
          /* 不显示ztree默认的图标 */
          showIcon: false,
          addDiyDom: this.addDiyDom
        },
        callback: {
          onClick: {}
        },
        data: {
          key: {
            name: 'text'
          }
        }
      },
      // 树的数据
      nodeId: '', // 节点的id
      treeData: [],
      collapsedWrapperMarginLeft: 0,
      /* lzyTableWrapper是否显示 */
      lzyTableWrapperShow: false,
      btnList: [
        {
          name: '新增',
          icon: 'el-icon-plus'
        },
        {
          name: '删除',
          icon: 'el-icon-delete'
        },
        {
          name: '导入',
          icon: 'el-icon-upload2'
        },
        {
          name: '导出',
          icon: 'el-icon-download'
        }
      ],
      breadcrumbs: [
        {id: 1, name: '432543'},
        {id: 2, name: '5765676'}
      ],
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

    addDiyDom (treeId, treeNode)
    {
      let aObj = $('#' + treeNode.tId + '_a');
      if ($('#diyBtn_' + treeNode.id).length > 0) return;
      let iconHtml = `<span class="${treeNode.iconUrl}" style="font-size: 14px;color: #E16531;"></span>`;
      aObj.prepend(iconHtml);
    },

    /**
     * 点击按钮组中的按钮触发
     * @author   lvzhiyuan
     * @date     2018/9/16
     * @param    name——点中的按钮名称
     */
    handleClick (name)
    {
      switch (name)
      {
        case '新增': { this.handleAdd(); break; }
        case '删除': { this.handleDel(); break; }
        case '导入': { break; }
        case '导出': { break; }
        default: break;
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
      // let obj = {
      //  dictionaryId: this.nodeId,
      // pageNum: this.currentPage,
      //  pageSize: val
      // };
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
      // let obj = {
      //  dictionaryId: this.nodeId,
      //  pageNum: val,
      //  pageSize: this.pageSize
      // };
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
    handleAdd ()
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
    // deleteFile (id) {
    // this.fileList.remove(this.fileList.find(item => item.id === id));
    // },

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
                this.getTableData();
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
    // 设置zTree的setting属性
    this.setting.callback.onClick = this.handleCollapseBarTreeClick;
    this.$nextTick(() =>
    {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      this.tableMaxHeight = document.body.offsetHeight - 209;
      this.lzyTableWrapperHeight = document.body.offsetHeight - 209;
      /* 新增框和编辑框的内容高度 */
      this.contentWrapperHeight = document.body.offsetHeight - 120;
    });
  },
  mounted ()
  {
    // 获取左边伸缩导航的树形结构
    setTimeout(() =>
    {
      getTree().then(res =>
      {
        let code = res.data.code;
        if (code === this.ERR_OK)
        {
          this.treeData = res.data.data.map(item =>
          {
            return {
              id: item.id,
              iconUrl: item.icon,
              text: item.text,
              parentId: item.parentId
            };
          });
          /* global $ */
          $.fn.zTree.init($('#treeDemo'), this.setting, this.treeData);
        }
      });
    }, 20);
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
        padding: 0 8px;
        position: relative;
        border-right: 1px solid #ddd;
        .icon {
          height: 23px;
          line-height: 23px;
          font-size: 16px;
          cursor: pointer;
          padding-left: 5px;
          text-decoration: none;
          float: left;
        }
      }
    }

    .main {
      overflow: hidden;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        line-height: 16px;
        padding-right: 8px;
        .content;

        .icon-group {
          visibility: hidden;
          opacity: 0;
          font-size: 16px;
          margin-left: 7px;
          transition-property: opacity, visibility;
          transition-duration: .5s, .5s;

          .el-icon-circle-plus-outline {
            color: #67C23A;
          }
          .el-icon-edit {
            color: #E6A23C;
          }
          .el-icon-close {
            color: #F56C6C;
          }
        }

        &:hover .icon-group {
          opacity: 1 !important;
          visibility: visible !important;
        }
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

        .pagenation {
          float: right;
          margin: 3px 5px 0 0;
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
