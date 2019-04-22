<template>
    <div class="form-container" v-loading.lock="isLoading">
      <el-form v-loading="isLoading">
        <iframe id="flowChart" :src="flowChartUrl" width="800" height="300" scrolling="no"></iframe>
        <el-dialog :visible.sync="isNodeSettingShow" width="60%" top>
          <div style="height:700px;">
            <node-setting ref="nodeSetting"></node-setting>
          </div>
        </el-dialog>
        <el-input ref="flowInput" id="flowInput" type="hidden"></el-input>
        <a id="flowClick" @click="editFn" type="hidden"></a>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import ztreeSelect from '@/components/ztreeSelect';
import nodeSetting from './nodeEdit';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    nodeSetting
  },
  data ()
  {
    return {
      isNodeSettingShow: false,
      handleFlag: false,
      nodeSeniorFlag: false,
      flowChartUrl: ''
    };
  },
  methods: {
    handleFn ()
    {
      this.handleFlag = true;
      this.nodeSeniorFlag = false;
    },
    nodeSeniorFn ()
    {
      this.handleFlag = false;
      this.nodeSeniorFlag = true;
    },
    editFn ()
    {
      let obj = this.$refs.flowInput.$el.firstElementChild.value;
      obj = JSON.parse(obj);
      obj.versionId = this.versionId;
      this.isNodeSettingShow = true;
      this.$store.dispatch('backStageSystem/_EXTENDSION/nodeEdit', obj);
    },
    saveFn ()
    {
      if (this.isNodeSettingShow)
      {
        this.$refs.nodeSetting.saveFn();
      }
      else
      {
        this.$message('请点击图片进行节点编辑!');
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_EXTENDSION', [
      'processDefinitionId',
      'versionId',
      'isLoading',
      'nodeMenus',
      'nodeBtns'
    ])
  },
  watch: {
    processDefinitionId (newValue)
    {
      if (newValue !== '')
      {
        let params = 'processDefinitionId=' + newValue;
        this.flowChartUrl = `/bpm/flowChart.html?${params}`;
        this.$store.dispatch('backStageSystem/_EXTENDSION/setProcessDefinitionId', { processDefinitionId: '' });
      }
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
