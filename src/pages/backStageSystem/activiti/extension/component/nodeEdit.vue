<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="nodeBtns"
      :breadcrumbs="nodeMenus"
      ref="rightNavLayout"
    ></right-nav-layout>
    <div class="form-container">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="处理者设置" name="nodeSetting">
          <br/>
          <node-setting ref="nodeSetting"></node-setting>
        </el-tab-pane>
        <el-tab-pane label="高级属性" name="nodeSenior">
          <br/>
          <node-senior ref="nodeSenior"></node-senior>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import ztreeSelect from '@/components/ztreeSelect';
import nodeSetting from './nodeSetting';
import nodeSenior from './nodeSenior';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    nodeSetting,
    nodeSenior
  },
  data ()
  {
    return {
      activeName: 'nodeSetting'
    };
  },
  methods: {
    saveFn ()
    {
      if (this.isLoading)
      {
        this.$message('请稍后再操作!');
        return;
      }
      if (this.activeName === 'nodeSetting')
      {
        this.$refs.nodeSetting.saveFn();
      }
      else
      {
        this.$refs.nodeSenior.saveFn();
      }
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_EXTENDSION', [
      'nodeMenus',
      'nodeBtns',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../../common/less/common';
</style>
