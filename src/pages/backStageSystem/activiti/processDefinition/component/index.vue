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
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/getTree').then(data =>
      {
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
        let obj = { value: treeNode.text, id: treeNode.id };
        this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/showList', obj);
      }
    },
    /**
     * 添加类型节点.
     * @author   yekuncai
     * @date     2019/2/26
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.level >= 1)
      {
        this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/addCategory', { type: 'category', parentId: treeNode.id });
      }
      else
      {
        this.$message(`请选择其他节点!`);
      }
      this.$common.stopEvent(event);
    },
    /**
     * 移除类型节点.
     * @author   yekuncai
     * @date     2019/2/26
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
        if (treeNode.level >= 2)
        {
          this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/removeCategory', {
            id: treeNode.id
          }).then(data =>
          {
            console.log(data);
            if (data.data.type === 'success')
            {
              this.$message({
                type: 'success',
                message: data.data.msg
              });
            }
            else
            {
              this.$message.error(data.data.msg);
            }
            this.initTree();
          });
        }
        else
        {
          this.$message(`非类型节点不能删除!`);
        }
      });
      this.$common.stopEvent(event);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROCESSDEFINITION', [
      'isRefreshTree'
    ])
  },
  watch: {
    isRefreshTree ()
    {
      this.initTree();
    }
  },
  created ()
  {
    this.initTree();
    let processName = localStorage.getItem('processName');
    let processParentId = localStorage.getItem('processParentId');
    if (processParentId !== null)
    {
      let obj = { value: processName, id: processParentId };
      localStorage.setItem('processName', '');
      localStorage.setItem('processParentId', '');
      this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/showList', obj);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
