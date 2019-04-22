<template>
  <!-- 树形结构工具栏 -->
  <div>
    事务类型：<br/><br/>
    <el-select v-model="category">
      <el-option
        v-for="first in firstSelect"
        :key="first.text"
        :label="first.text"
        :value="first.text">
      </el-option>
    </el-select>
    <br/><br/>
    处理状态：<br/><br/>
    <el-select v-model="userClick">
      <el-option
        v-for="secon in secondSelect"
        :key="secon.text"
        :label="secon.text"
        :value="secon.text">
      </el-option>
    </el-select>
    <br/><br/>
    <el-button type="primary" icon="el-icon-search" @click="searchFn">搜索</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
import { mapGetters } from 'vuex';
export default {
  components: {
    ztreeSelect
  },
  data ()
  {
    return {
      firstSelect: [],
      secondSelect: [],
      category: '',
      userClick: ''
    };
  },
  methods: {
    /**
     * 初始化或更新subLeftTree树
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    initTree ()
    {
      this.category = this.bulletin.category;
      this.userClick = this.bulletin.userClick;
      this.$store.dispatch('backStageSystem/_TODOTASK/getTree', this.bulletin).then(data =>
      {
        this.firstSelect = data.first;
        this.secondSelect = data.second;
        this.$store.dispatch('backStageSystem/_TODOTASK/showList', this.bulletin);
      });
    },
    searchFn ()
    {
      let obj = { category: this.category, userClick: this.userClick };
      this.$store.dispatch('backStageSystem/_TODOTASK/showList', obj);
    },
    /**
     * 树节点点击回调函数
     * @author  lvzhiyuan
     * @date    2018/6/1
     * @param   event——点击的事件信息
     * @param   treeId——树的id
     * @param   treeNode——封装了被点中的节点的信息的对象
     * @return
     */
    clickFn (event, treeId, treeNode)
    {
      this.$store.dispatch('backStageSystem/_TODOTASK/showList', '');
    }
  },
  computed:
    {
      ...mapGetters([
        'bulletin'
      ])
    },
  created ()
  {
    this.initTree();
  },
  watch: {
    bulletin ()
    {
      this.initTree();
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
 /deep/.el-menu{
  border: 0px;
}
/deep/.el-col-12{
  width: 100%;
}
</style>
