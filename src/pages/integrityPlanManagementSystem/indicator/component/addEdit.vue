<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
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
              <h2 style="text-align: center">细目指标管理</h2>
            </th>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 指标编码
            </th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 指标名称
            </th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 指标内容
            </th>
            <td>
              <el-form-item label="" prop="content" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.content" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 单位
            </th>
            <td>
              <el-form-item label="" prop="deptName" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.deptName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 单价
            </th>
            <td>
              <el-form-item label="" prop="price" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.price" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 是否细目
            </th>
            <td>
              <el-form-item label="" prop="isDetail">
                <el-radio v-model="formData.isDetail" label="1" :readonly="readOnly">是</el-radio>
                <el-radio v-model="formData.isDetail" label="0" :readonly="readOnly">否</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 备注说明
            </th>
            <td colspan="3">
              <el-form-item label="" prop="comment" :rules="[$validate.Required]">
                <el-input type="textarea" cols="50" rows="2" maxlength="100" placeholder="请输入备注说明"
                          v-model="formData.comment" :readonly="readOnly">
                </el-input>
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
import uploader from '@/components/uploader';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    uploader
  },
  methods: {
    /**
     * 表单提交
     * @author   yekuncai
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
            let obj = this.formData;
            obj.isDetailEdit = this.isDetailEdit;
            this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/save', obj);
          }
        });
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2018/12/25
     */
    returnFn ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/return');
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_INDICATOR', [
      'readOnly',
      'formData',
      'parentId',
      'isDetailEdit',
      'isLoading',
      'navigateMenus',
      'operateBtns'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
