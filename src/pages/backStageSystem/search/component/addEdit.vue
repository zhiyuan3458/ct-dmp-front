<template>
    <div class="lzy-table-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
      ></right-nav-layout>
      <div class="form-table-wrapper">
        <el-form :model="formData" :rules="metaData.rules" ref="ctForm" v-loading="metaData.loading">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="38%"/>
              <col width="12%"/>
              <col width="38%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 索引：
              </th>
              <td>
                <el-form-item label="" prop="docIndex">
                  <el-input class="form-input" v-model="formData.docIndex" placeholder="请填写编码"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 类型：
              </th>
              <td>
                <el-form-item label="" prop="type">
                  <el-input class="form-input" v-model="formData.type"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 名称：
              </th>
              <td>
                <el-form-item label="" prop="name">
                  <el-input class="form-input" v-model="formData.name" placeholder="请填写"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 标题：
              </th>
              <td>
                <el-form-item label="" prop="title">
                  <el-input class="form-input" v-model="formData.title" placeholder="请填写"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 内容：
              </th>
              <td>
                <el-form-item label="" prop="context">
                  <el-input class="form-input" v-model="formData.context" placeholder="请填写"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        loading: false,
        rules: { /* 验证表单规则 */
          roleCode: [
            { required: true, message: '请输入角色编号', trigger: 'blur' }
          ],
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ]
        }
      }
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   yekuncai
     * @date     2018/10/16
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            // id为空说明是新增的
            if (this.formData.id === '')
            {
            }
            else
            {
              obj = this.formData;
            }
            this.loading = true;
            this.$store.dispatch('backStageSystem/_SEARCH/saveOrUpdate', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回上一页
     * @author   yekuncai
     * @date     2018/10/11
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_SEARCH/returnFn', {isAddEditShow: false, isListShow: true});
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_SEARCH', [
      'marginLeft',
      'formData',
      'navigateMenus',
      'operateBtns',
      'saveOrUpdateId',
      'isAddEditShow'
    ])
  },
  watch: {
    saveOrUpdateId (newValue, oldValue)
    {
      if (newValue !== null && newValue !== '')
      { // 刷新表单
        this.$store.dispatch('backStageSystem/_SEARCH/addEdit', {id: newValue});
      }
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
  }
</style>
