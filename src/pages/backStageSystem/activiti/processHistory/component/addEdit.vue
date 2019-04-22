<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="formData" :rules="metaData.rules" ref="ctForm">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="38%"/>
              <col width="12%"/>
              <col width="38%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 流程名称：
              </th>
              <td>
                <el-form-item label="" prop="defName">
                  <el-input class="form-input" v-model="formData.defName" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 创建人：
              </th>
              <td>
                <el-form-item label="" prop="creator">
                  <el-input type="textarea" cols="50" rows="1" v-model="formData.creator" :readonly="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 流程分类：
              </th>
              <td>
                <el-form-item label="" prop="defCategory">
                  <el-input class="form-input" v-model="formData.defCategory" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 流程版本：
              </th>
              <td>
                <el-form-item label="" prop="version">
                  <el-input class="form-input" v-model="formData.version" readonly="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 开始日期：
              </th>
              <td>
                <el-form-item label="" prop="startTime">
                  <el-input class="form-input" v-model="formData.startTime" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 流程状态：
              </th>
              <td>
                <el-form-item label="" prop="category">
                  <el-input class="form-input" v-model="formData.category" readonly="true"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 当前流程节点名称：
              </th>
              <td>
                <el-form-item label="" prop="taskName">
                  <el-input class="form-input" v-model="formData.taskName" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 流程实例id：
              </th>
              <td>
                <el-form-item label="" prop="nodeType">
                  <el-input type="textarea" cols="50" rows="1" v-model="formData.processInstanceId" :readonly="true">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 业务类名称：
              </th>
              <td>
                <el-form-item label="" prop="businessClass">
                  <el-input class="form-input" v-model="formData.businessClass" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                <span style="color: red;">*</span> 业务id：
              </th>
              <td>
                <el-form-item label="" prop="businessId">
                  <el-input type="textarea" cols="50" rows="1" v-model="formData.businessId" :readonly="true"></el-input>
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
import iconSelect from '@/components/iconSelect';
export default {
  components: {
    rightNavLayout,
    iconSelect
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
    returnFn ()
    {
      let obj = { isRefreshDetailList: true };
      this.$store.dispatch('backStageSystem/_PROCESSHISTORY/return', obj);
    },
    saveFn ()
    {
      this.$message(`功能尚未完善!`);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROCESSHISTORY', [
      'marginLeft',
      'formData',
      'activitiEntity',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'isAddEditShow'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
