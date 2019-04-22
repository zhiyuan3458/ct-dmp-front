<template>
    <div class="form-container" v-loading.lock="isLoading">
      <el-form :model="starter">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th>
              <span style="color: red;">*</span> 注意：
            </th>
            <td colspan="3">
              流程启动者(如果为空，则所有用户都可以启动)
            </td>
          </tr>
          <tr>
            <th>
              用户：
            </th>
            <td>
              <el-form-item prop="userIds">
                <ztree-select
                  v-model="starter.userIds"
                  :ztreeList="userTree"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>
              角色：
            </th>
            <td>
              <el-form-item prop="roleIds">
                <ztree-select
                  v-model="starter.roleIds"
                  :ztreeList="roleTree"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
      userNames: '',
      roleNames: ''
    };
  },
  methods: {
    returnFn ()
    {
      let router = '/backStageSystem/processdefinition';
      this.$router.push(router);
    },
    saveFn ()
    {
      this.$store.dispatch('backStageSystem/_EXTENDSION/saveStarter', this.starter).then(data =>
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
      'starter',
      'userTree',
      'roleTree',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
