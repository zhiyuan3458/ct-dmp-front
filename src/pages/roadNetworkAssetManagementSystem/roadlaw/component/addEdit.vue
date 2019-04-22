<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <input v-show="false" v-model="formData.lawType">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">公路法律法规</h2>
            </th>
          </tr>
          <tr>
            <th>名称</th>
            <td>
              <el-form-item label="" prop="name">
                <el-input style="width: 100%;" class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>上传者</th>
            <td>
              <el-form-item label="" prop="userName">
                <el-input style="width: 100%;" class="form-input" v-model="formData.userName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>上传日期</th>
            <td>
              <el-form-item label="" prop="uploadTime">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.uploadTime"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>发布实施时间</th>
            <td>
              <el-form-item label="" prop="releaseTime">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.releaseTime"
                  type="date"
                  :readonly="readOnly" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附件</th>
            <td colspan="5" height="190" class="upload-td">
              <uploader v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        deptTreeTool: null,
        roleTreeTool: null
      }
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   liangyi
     * @date     2018/12/25
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
              obj = Object.assign({}, this.formData, {
                // roleIds: roleIds,
                // lawTypes: lawTypes
              });
            }
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADLAW/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   liangyi
     * @date     2018/12/25
     */
    returnFn ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADLAW/showList', this.lawType);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADLAW', [
      'readOnly',
      'formData',
      'lawType',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns'
    ])
  },
  watch: {
    roleTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.roleTreeTool = new TreeTool('roleTree', this.roleTree, true);
          this.metaData.roleTreeTool.setCheck();
        }
      }, 20);
    },
    deptTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.deptTreeTool = new TreeTool('deptTree', this.deptTree, true);
          this.metaData.deptTreeTool.setCheck();
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
