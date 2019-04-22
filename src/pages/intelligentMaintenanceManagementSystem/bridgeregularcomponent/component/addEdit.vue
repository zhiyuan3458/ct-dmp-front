<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <input v-show="false" v-model="formData.bridgeType">
          <colgroup>cnpm
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥梁定期检查组件</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>组件名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桥梁组成名称</th>
            <td>
              <el-form-item label="" prop="bridgeFormName">
                <form-component
                  v-model="formData.bridgeFormName"
                  type="select"
                  dictionaryCode="bridgeform"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>权重值</th>
            <td colspan="3">
              <el-form-item label="" prop="score" :rules="[$validate.Required,$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.score" :readonly="readOnly"></el-input>
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
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/child-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    childTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
      }
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
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
            Object.assign(obj, this.formData);
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT/save', obj);
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
     * @author   chenguang
     * @date     2018/11/18
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
