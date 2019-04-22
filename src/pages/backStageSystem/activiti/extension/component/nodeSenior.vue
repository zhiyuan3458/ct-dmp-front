<template>
    <div class="form-container" v-loading.lock="isLoading">
      <el-form :model="nodeSenior">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="88%"/>
          </colgroup>
          <tr>
            <th>
              节点类型：
            </th>
            <td>
              <el-form-item label="" prop="nodeType">
                <el-radio v-model="nodeSenior.nodeType" label="普通节点">普通节点</el-radio>
                <el-radio v-model="nodeSenior.nodeType" label="会签节点">会签节点</el-radio>
                <el-radio v-model="nodeSenior.nodeType" label="分发节点">分发节点</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              驳回：
            </th>
            <td>
              <el-form-item label="" prop="disallow">
                <el-radio v-model="nodeSenior.disallow" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.disallow" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              保存：
            </th>
            <td>
              <el-form-item label="" prop="save">
                <el-radio v-model="nodeSenior.save" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.save" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              提交：
            </th>
            <td>
              <el-form-item label="" prop="submit">
                <el-radio v-model="nodeSenior.submit" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.submit" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              中止：
            </th>
            <td>
              <el-form-item label="" prop="termination">
                <el-radio v-model="nodeSenior.termination" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.termination" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
          <th>
            取回：
          </th>
          <td>
            <el-form-item label="" prop="retrieve">
              <el-radio v-model="nodeSenior.retrieve" label="启用">启用</el-radio>
              <el-radio v-model="nodeSenior.retrieve" label="禁用">禁用</el-radio>
            </el-form-item>
          </td>
          </tr>
          <tr>
            <th>
              流程图：
            </th>
            <td>
              <el-form-item label="" prop="flowChart">
                <el-radio v-model="nodeSenior.flowChart" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.flowChart" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              流程意见信息：
            </th>
            <td>
              <el-form-item label="" prop="getComments">
                <el-radio v-model="nodeSenior.getComments" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.getComments" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              自动提醒类型：
            </th>
            <td>
              <el-form-item label="" prop="alertType">
                <el-radio v-model="nodeSenior.alertType" label="邮件">邮件</el-radio>
                <el-radio v-model="nodeSenior.alertType" label="短信">短信</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              电子签名：
            </th>
            <td>
              <el-form-item label="" prop="electronicSignature">
                <el-radio v-model="nodeSenior.electronicSignature" label="启用">启用</el-radio>
                <el-radio v-model="nodeSenior.electronicSignature" label="禁用">禁用</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              持续时间(天)：
            </th>
            <td>
              <el-form-item label="" prop="days">
                <el-input class="form-input" v-model="nodeSenior.days"></el-input>
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
      let obj = { isNodeSettingShow: true };
      this.$store.dispatch('backStageSystem/_EXTENDSION/setShowFlag', obj);
    },
    saveFn ()
    {
      this.$store.dispatch('backStageSystem/_EXTENDSION/saveNodeSenior', this.nodeSenior).then(data =>
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
      'nodeSenior',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
