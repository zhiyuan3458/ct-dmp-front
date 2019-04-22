<template>
  <!-- 树形结构工具栏 -->
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="0" @select="handleSelect">
          <el-menu-item
            v-for="item in ztreeList"
            :key="item.id"
            :index="item.code"
          >
            <i class="el-icon-menu"></i>{{item.text}}
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data ()
  {
    return {
      ztreeList: [ {id: '1', code: '公告', text: '公告'}, {id: '2', code: '通知', text: '通知'} ]
    };
  },
  methods: {
    /**
     * 切换目录
     * @author   yekuncai
     * @date     2019/3/22
     */
    handleSelect (key, keyPath)
    {
      let formCondition = {
        key: this.key
      };
      let extraCondition = JSON.stringify(formCondition) === '{}' ? null : JSON.stringify(formCondition);
      let obj = { extraCondition: extraCondition, category: key };
      this.$store.dispatch('backStageSystem/_NOTICE/showList', obj);
    }
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
