<template>
    <div class="form-container" v-loading.lock="isLoading">
      <el-form :model="senior">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="88%"/>
          </colgroup>
          <tr>
            <th>
              启用意见处理：
            </th>
            <td>
              <el-form-item label="" prop="commentFlag">
                <el-radio v-model="senior.commentFlag" label="true">是</el-radio>
                <el-radio v-model="senior.commentFlag" label="false">否</el-radio>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
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
  methods: {
    returnFn ()
    {
      let router = '/backStageSystem/processdefinition';
      this.$router.push(router);
    },
    saveFn ()
    {
      this.$store.dispatch('backStageSystem/_EXTENDSION/saveSeniorSetting', this.senior).then(data =>
      {
        this.$message({
          type: 'success',
          message: data.data.msg
        });
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_EXTENDSION', [
      'senior',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
