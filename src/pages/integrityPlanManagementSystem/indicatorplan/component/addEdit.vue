<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow"  v-loading.lock="isLoading">
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <activiti-form
          ref="activitiForm" :defName="defName" :defKey="defKey" :formData="formData"
          :operateBtns="operateBtns" :navigateMenus="navigateMenus">
        </activiti-form>
        <br/>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <!--<tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">年度、月度指标</h2>
            </th>
          </tr>-->
          <tr>
            <th>
              <span style="color: red;">*</span> 编号
            </th>
            <td>
              <el-form-item label="" prop="serialNumber" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.serialNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 年份
            </th>
            <td>
              <el-form-item label="" prop="year">
                <el-date-picker style="width: 100%;" v-model="formData.year" type="year" value-format="yyyy"> :readonly="readOnly"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 名称
            </th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 编制部门
            </th>
            <td>
              <el-form-item label="" prop="deptName" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.deptName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              <span style="color: red;">*</span> 编制人
            </th>
            <td>
              <el-form-item label="" prop="userName">
                <el-input style="width: 100%;" class="form-input" v-model="formData.userName" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>
              <span style="color: red;">*</span> 编制日期
            </th>
            <td>
              <el-form-item label="" prop="compileDate">
                <el-date-picker style="width: 100%;" v-model="formData.compileDate" type="date" value-format="yyyy-MM-dd"> :readonly="readOnly"></el-date-picker>
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
import activitiForm from '@/components/ActivitiForm/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    activitiForm
  },
  data ()
  {
    return {
      defName: '测试1', // 流程定义名称
      defKey: 'test1' // 流程定义标识
    };
  },
  methods: {
    /**
     * 获取审批人和审批角色
     * @author   yekuncai
     * @date     2019/1/28
     */
    setActivitiInfo (data)
    {
      this.formData.roleNames = data.roleNames;
      this.formData.userNames = data.userNames;
      this.formData.comment = data.comment;
      this.formData.defKey = this.defKey;
    },
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
            this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/save', obj);
          }
        });
      });
    },
    /**
     * 提交
     */
    submitFn ()
    {
      this.$refs['ctForm'].validate((valid) =>
      {
        if (valid)
        {
          this.$store.dispatch(`integrityPlanManagementSystem/_INDICATORPLAN/setIsLoading`, true);
          this.$store.dispatch(`integrityPlanManagementSystem/_INDICATORPLAN/submit`, this.formData).then(data =>
          {
            if (data.data.type === 'success')
            {
              this.$message({
                type: 'success',
                message: data.data.msg
              });
            }
            else
            {
              this.$message.error(data.data.msg);
            }
            this.$refs.activitiForm.returnFn();
          });
        }
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2018/12/25
     */
    returnFn ()
    {
      this.$store.dispatch('setBusinessId', '');
      this.$store.dispatch('setRefreshTodoTask', true);
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATORPLAN/showList', this.indicatorType);
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_INDICATORPLAN', [
      'readOnly',
      'isAddEditShow',
      'formData',
      'indicatorType',
      'ztreeSelect',
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
