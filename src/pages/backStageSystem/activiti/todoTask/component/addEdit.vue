<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
      ></right-nav-layout>
      <div class="form-container">
        <el-form v-loading="isLoading">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="88%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 代办人：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="userNames">
                  <ztree-select
                    v-model="userNames"
                    :ztreeList="userTree"
                    :readOnly="false"
                  ></ztree-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <th>
                <span style="color: red;">*</span> 代办意见：
              </th>
              <td colspan="3">
                <el-form-item label="" prop="comment">
                  <el-input type="textarea" cols="50" rows="5" maxlength="100"
                            placeholder="请输入代办意见" v-model="comment"  :rules="[$validate.Required]">
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
import { mapGetters } from 'vuex';
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    rightNavLayout,
    ztreeSelect
  },
  data ()
  {
    return {
      definition: '',
      userNames: '',
      comment: ''
    };
  },
  methods: {
    returnFn ()
    {
      let obj = { isRefreshList: true };
      this.$store.dispatch('backStageSystem/_TODOTASK/return', obj);
    },
    submitFn ()
    {
      if (this.comment === '')
      {
        this.$message('请填写代办意见!');
        return;
      }
      if (this.userNames === '')
      {
        this.$message('请选择代办人!');
        return;
      }
      let obj = { processInstanceId: this.formData.processInstanceId, comment: this.comment, userNames: this.userNames };
      this.$store.dispatch('backStageSystem/_TODOTASK/submit', obj).then(data =>
      {
        this.$store.dispatch('setRefreshTodoTask', true);
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_TODOTASK', [
      'formData',
      'navigateMenus',
      'operateBtns',
      'userTree',
      'isAddEditShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
