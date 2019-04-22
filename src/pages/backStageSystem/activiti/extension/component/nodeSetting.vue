<template>
    <div class="form-container" style="height: 80%" v-loading.lock="isLoading">
      <el-form :model="nodeSetting">
        <table class="form-table" width="80%">
          <colgroup>
            <col width="15%"/>
            <col width="35%"/>
            <col width="15%"/>
            <col width="35%"/>
          </colgroup>
          <tr>
            <th>
              节点名称：
            </th>
            <td colspan="3">
              <el-form-item label="" prop="nodeName">
                <span>{{nodeSetting.nodeName}}</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              处理方式：
            </th>
            <td  colspan="3">
              <el-form-item label="" prop="handling">
                <el-radio v-model="nodeSetting.handling" label="顺序处理">顺序处理(等所有人都处理完流程才往下走)</el-radio>
                <el-radio v-model="nodeSetting.handling" label="随机处理">随机处理(任意一个人处理后流程马上往下走)</el-radio>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              多人处理：
            </th>
            <td>
              <el-form-item label="" prop="multiprocessor">
                <el-radio v-model="nodeSetting.multiprocessor" label="1">是</el-radio>
                <el-radio v-model="nodeSetting.multiprocessor" label="0">否</el-radio>
              </el-form-item>
            </td>
            <th>
              是否允许启动者中止流程:
            </th>
            <td>
              <el-form-item label="" prop="endFlag">
                <el-radio v-model="nodeSetting.termination" label="是">是</el-radio>
                <el-radio v-model="nodeSetting.termination" label="否">否</el-radio>
              </el-form-item>
            </td>
          </tr><tr>
          <th>
            流程启动者：
          </th>
          <td colspan="3">
            <el-form-item label="" prop="starterFlag">
              <el-radio v-model="nodeSetting.starterFlag" label="是">是</el-radio>
              <el-radio v-model="nodeSetting.starterFlag" label="否">否</el-radio>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th colspan="2" style="text-align:center">
            处理者
          </th>
          <th colspan="2" style="text-align:center">
            读者
          </th>
        </tr>
          <tr>
            <th>
              下一步处理用户：
            </th>
            <td>
              <el-form-item label="" prop="userHandler">
                <ztree-select
                  v-model="nodeSetting.userHandler"
                  :ztreeList="userHandler"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>
              用户：
            </th>
            <td>
              <el-form-item label="" prop="userReader">
                <ztree-select
                  v-model="nodeSetting.userReader"
                  :ztreeList="userReaderTree"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>
              下一级处理角色：
            </th>
            <td>
              <el-form-item label="" prop="roleHandler">
                <ztree-select
                  v-model="nodeSetting.roleHandler"
                  :ztreeList="roleHandler"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>
              角色：
            </th>
            <td>
              <el-form-item label="" prop="roleReader">
                <ztree-select
                  v-model="nodeSetting.roleReader"
                  :ztreeList="roleReaderTree"
                  :readOnly="false"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
      this.$store.dispatch('backStageSystem/_EXTENDSION/saveNodeEdit', this.nodeSetting).then(data =>
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
      'nodeSetting',
      'userHandler',
      'roleHandler',
      'userReaderTree',
      'roleReaderTree',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
