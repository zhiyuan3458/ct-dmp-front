<template>
  <!-- 树形结构工具栏 -->
  <el-row class="tac">
    <el-col :span="12">
      <el-menu class="el-menu-vertical-demo" mode="horizontal" v-for="item in ztreeList" :key="item.id" @select="handleSelect">
        <el-menu-item :index="item.code"><i class="el-icon-menu"></i>{{item.text}}</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
  data ()
  {
    return {
      ztreeList: []
    };
  },
  methods: {
    /**
     * 初始化ztree树
     * @author   chenguang
     * @date     2018/11/16
     */
    initTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT/getTree').then(data =>
      {
        this.ztreeList = data.ztreeList;
      });
    },
    /**
     * 树节点点击回调函数
     * @author   chenguang
     * @date     2018/11/16
     */
    handleSelect (key, keyPath)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT/showList', key);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCOMPONENT', [
      'treeList'
    ])
  },
  mounted ()
  {
    /**
     * 初始化树
     * @param newValue
     * @param oldValue
     */
    this.initTree();
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
  /deep/.el-menu{
    border: 0px;
  }
  /deep/.el-col-12{
    width: 100%;
  }
</style>
