<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
      <div class="form-container">
        <el-form :model="formData" ref="ctForm">
          <activiti-form
            ref="activitiForm" :defName="definition.name" :defKey="definition.modelKey" :formData="formData"
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
            <tr>
              <th>
                用户名：
              </th>
              <td>
                <el-form-item label="" prop="userName">
                  <el-input class="form-input" v-model="formData.userName" readonly="true"></el-input>
                </el-form-item>
              </td>
              <th>
                测试类型：
              </th>
              <td>
                <el-form-item style="width: 80px">
                  <el-select :disabled="isSelect" v-model="definition" value-key="id" placeholder="请选择">
                    <el-option
                      v-for="item in defList"
                      :key="item.id"
                      :label="item.name"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 原因：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="reason" :rules="[$validate.Required]">
                  <el-input type="textarea" cols="50" rows="2" maxlength="100" placeholder="请输入原因"
                    v-model="formData.reason" :readonly="readOnly">
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                附件：
              </th>
              <td colspan="3" height="100px">
                <uploader v-model="formData.fileSessionId" :multiple="false">
                </uploader>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar/index';
import { mapGetters } from 'vuex';
import uploader from '@/components/uploader/index';
import activitiForm from '@/components/ActivitiForm/index';
import ztreeSelect from '@/components/ztreeSelect';
import { getDefList } from '@/api/backStageSystem/activiti/todoTask/index';
export default {
  name: 'diuni',
  components: {
    rightNavLayout,
    uploader,
    ztreeSelect,
    activitiForm
  },
  data ()
  {
    return {
      isSelect: false, // 是否可选择
      definition: {}, // 流程定义
      defList: [] // 流程定义列表
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
      this.formData.defKey = this.definition.modelKey;
    },
    returnFn ()
    {
      this.$store.dispatch('setBusinessId', '');
      this.$store.dispatch('setRefreshTodoTask', true);
      this.$store.dispatch('backStageSystem/_LEAVE/return', { isRefreshList: true });
    },
    /**
    * 保存
    */
    saveFn ()
    {
      this.$confirm('是否保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            this.$store.dispatch(`backStageSystem/_LEAVE/save`, this.formData).then(data =>
            {
              this.$store.dispatch('backStageSystem/_LEAVE/return', { isRefreshList: true });
            });
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
          this.$store.dispatch(`backStageSystem/_LEAVE/setIsLoading`, true);
          this.$store.dispatch(`backStageSystem/_LEAVE/submit`, this.formData).then(data =>
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
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_LEAVE', [
      'formData',
      'readOnly',
      'navigateMenus',
      'operateBtns',
      'isAddEditShow',
      'isLoading'
    ])
  },
  watch: {
    formData ()
    {
      if (this.formData.processInstanceId !== undefined)
      {
        this.isSelect = true;
      }
      else
      {
        this.isSelect = false;
      }
    }
  },
  created ()
  {
    let obj = { systemName: '后台管理系统', category: '测试类型' };
    getDefList(obj).then(data =>
    {
      this.defList = data.data.data.object;
      this.definition = this.defList[this.defList.length - 1];
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
