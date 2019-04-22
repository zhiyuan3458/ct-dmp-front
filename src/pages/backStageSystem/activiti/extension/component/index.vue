<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
export default {
  data ()
  {
    return {
      metaData: {
        treeTool: null,
        treeLevel: []
      }
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
      let processName = localStorage.getItem('processName');
      let parentId = localStorage.getItem('processParentId');
      let obj = { processName: processName, parentId: parentId };
      this.$store.dispatch('backStageSystem/_EXTENDSION/getTree', obj).then(data =>
      {
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList);
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', 3);
      });
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
      if (treeNode.level === 0)
      {
        this.$message(`请选择其他节点!`);
      }
      else
      {
        let obj = { versionId: treeNode.id, refresh: new Date() };
        this.$store.dispatch('backStageSystem/_EXTENDSION/starterEdit', obj);
      }
    }
  },
  created ()
  {
    this.initTree(this.processName);
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
