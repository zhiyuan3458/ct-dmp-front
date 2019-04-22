<template>
  <div class="lzy-form-wrapper" v-if="isSettingShow" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      ref="rightNavLayout"
    ></right-nav-layout>
    <div class="form-container">
      <table class="form-table" width="100%">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="启动者设置" name="starter">
            <br/>
            <starter-edit ref="starterEdit"></starter-edit>
          </el-tab-pane>
          <el-tab-pane label="节点设置" name="node">
            <br/>
            <flow-chart ref="flowChart"></flow-chart>
          </el-tab-pane>
          <el-tab-pane label="高级属性设置" name="senior">
            <br/>
            <senior-setting ref="seniorSetting"></senior-setting>
          </el-tab-pane>
        </el-tabs>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import ztreeSelect from '@/components/ztreeSelect';
import starterEdit from './starterEdit.vue';
import flowChart from './flowChart.vue';
import seniorSetting from './seniorSetting.vue';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    starterEdit,
    seniorSetting,
    flowChart
  },
  data ()
  {
    return {
      activeName: 'starter'
    };
  },
  methods: {
    handleClick ()
    {
      if (!this.isLoading)
      {
        this.$store.dispatch('backStageSystem/_EXTENDSION/setIsLoading', false);
      }
    },
    returnFn ()
    {
      let router = '/backStageSystem/processdefinition';
      this.$router.push(router);
    },
    saveFn ()
    {
      if (this.isLoading)
      {
        this.$message('请稍后再操作!');
        return;
      }
      if (this.activeName === 'starter')
      {
        this.$refs.starterEdit.saveFn();
      }
      else if (this.activeName === 'node')
      {
        this.$refs.flowChart.saveFn();
      }
      else
      {
        this.$refs.seniorSetting.saveFn();
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_EXTENDSION', [
      'marginLeft',
      'navigateMenus',
      'operateBtns',
      'versionId',
      'isSettingShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
