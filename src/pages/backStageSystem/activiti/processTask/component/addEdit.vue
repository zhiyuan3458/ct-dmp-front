<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      ref="rightNavLayout"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData"  ref="ctForm">
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
              <el-form-item label="" prop="processDefinitionName">
                <el-input class="form-input" v-model="formData.defName" readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 创建人：
            </th>
            <td>
              <el-form-item label="" prop="creator">
                <el-input class="form-input" v-model="formData.creator" readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 创建日期：
            </th>
            <td>
              <el-form-item label="" prop="beginDate">
                <el-input class="form-input" v-model="formData.startTime" readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 任务状态：
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
              <span style="color: red;">*</span> 当前流程节点类型：
            </th>
            <td>
              <el-form-item label="" prop="nodeType">
                <el-input class="form-input" v-model="formData.nodeType" readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 业务id：
            </th>
            <td>
              <el-form-item label="" prop="businessId">
                <el-input type="textarea" cols="50" rows="1" v-model="formData.businessId" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 业务实体：
            </th>
            <td>
              <el-form-item label="" prop="businessClass">
                <el-input class="form-input" v-model="formData.businessClass" readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 流程实例id：
            </th>
            <td>
              <el-form-item label="" prop="nodeType">
                <el-input type="textarea" cols="50" rows="1" v-model="formData.processInstanceId" :readonly="true">
                </el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 流程版本：
            </th>
            <td>
              <el-form-item label="" prop="taskName">
                <el-input class="form-input" v-model="formData.version" readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 意见信息：
            </th>
            <td>
              <el-form-item label="" prop="nodeType">
                <el-input class="form-input" v-model="formData.comment" readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 任务处理人：
            </th>
            <td>
              <el-form-item label="" prop="assignee">
                <el-input type="textarea" cols="50" rows="1" v-model="formData.assignee" :readonly="true"></el-input>
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
  methods: {
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_PROCESSTASK/return', '');
    },
    saveFn ()
    {
      this.$message(`功能尚未完善!`);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROCESSTASK', [
      'marginLeft',
      'formData',
      'navigateMenus',
      'operateBtns',
      'isAddEditShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
