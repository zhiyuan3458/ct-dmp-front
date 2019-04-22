<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
import { mapGetters } from 'vuex';
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
      this.$store.dispatch('backStageSystem/_DICTIONARY/getTree').then(data =>
      {
        let level = 1;
        if (this.metaData.treeTool !== null)
        {
          level = this.metaData.treeTool.getTreeExpandLevel();
        }
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList);
        let operateBtns = data.operateBtns;
        let length = operateBtns.length;
        let map = new Map();
        for (let i = 0; i < length; i++)
        {
          let key = {name: operateBtns[i].displayValue, icon: operateBtns[i].icon};
          map.set(key, Reflect.get(this, `${operateBtns[i].displayValue}Fn`));
        }
        this.metaData.treeTool.setOperatePrivilege(map);
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', level);
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
      if (treeNode.type !== 'root')
      {
        if (treeNode.type === '1')
        { // 目录节点
          this.$store.dispatch('backStageSystem/_DICTIONARY/edit', {id: treeNode.id});
        }
        else
        {
          // 默认是内容节点
          this.$store.dispatch('backStageSystem/_DICTIONARY/showList', treeNode.code);
        }
      }
    },
    /**
     * 添加数据字典的目录结构节点
     * @author   chenguang
     * @date     2018/9/29
     */
    addCatalogFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      let type = treeNode.type;
      // 根目录转换为目录类型
      if (type === 'root')
      {
        type = '1';
      }
      if (treeNode.type === '0')
      {
        this.$message('“数据内容节点”下不能添加“目录结构节点”！');
        return false;
      }
      this.$store.dispatch('backStageSystem/_DICTIONARY/add', {type: type, parentId: treeNode.id});
      this.$common.stopEvent(event);
    },
    /**
     * 添加数据字典的数据内容节点
     * @author   chenguang
     * @date     2018/9/30
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.type === 'root')
      {
        this.$message('“根节点”下不能添加“数据内容节点”！');
        return false;
      }
      else if (treeNode.type === '1')
      { // 目录节点新增数据内容节点
        this.$store.dispatch('backStageSystem/_DICTIONARY/add', {type: 0, parentId: treeNode.id});
      }
      else
      { // 数据内容节点新增数据信息
        this.$store.dispatch('backStageSystem/_DICTIONARY/add', {type: 0, parentId: treeNode.parentId, value: treeNode.code, name: treeNode.text});
      }
      this.$common.stopEvent(event);
    },
    /**
     * 移除节点
     * @author   chenguang
     * @date     2018/9/30
     */
    removeFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      this.$confirm('确认要删除“' + treeNode.text + '”节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('backStageSystem/_DICTIONARY/remove', {
          type: treeNode.type,
          id: treeNode.id
        }).then(data =>
        {
          if (data.data !== undefined && data.data !== '')
          {
            this.$message(`${treeNode.text}节点的子节点不为空`);
          }
          else
          {
            this.initTree();
          }
        });
      });
      this.$common.stopEvent(event);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DICTIONARY', [
      'isRefreshTree'
    ])
  },
  watch: {
    /**
     * 当左边点击保存按钮时，刷新右边index.vue的树
     * @author   lvzhiyuan
     * @date     2018/10/20
     */
    isRefreshTree (newValue, oldValue)
    {
      if (newValue)
      {
        this.initTree();
      }
    }
  },
  /**
   * 初始化树
   * @author   lvzhiyuan
   * @date     2018/10/20
   */
  mounted ()
  {
    this.initTree();
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
