<template>
  <!-- 树形结构工具栏 -->
  <ul slot="tree" id="subLeftTree" class="ztree"></ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
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
     * 初始化ztree树
     * @author   yekuncai
     * @date     2018/11/16
     */
    initTree ()
    {
      let obj = { rootId: this.rootId, urlType: this.urlType };
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/getTree', obj).then(data =>
      {
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList);
        this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('subLeftTree');
        if (this.urlType === 'edit')
        {
          let operateBtns = data.operateBtns;
          let length = operateBtns.length;
          let map = new Map();
          for (let i = 0; i < length; i++)
          {
            let key = {name: operateBtns[i].displayValue, icon: operateBtns[i].icon};
            map.set(key, Reflect.get(this, `${operateBtns[i].displayValue}Fn`));
          }
          this.metaData.treeTool.setOperatePrivilege(map);
        }
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.$emit('getLevel', {
          treeObj: this.metaData.treeTool,
          treeLevel: this.metaData.treeLevel
        });
        this.metaData.treeTool.expandLevel('subLeftTree', 2);
      });
    },
    /**
     * 新增
     * @author   yekuncai
     * @date     2019/1/16
     */
    addFn (event)
    {
      // 防止冒泡，因为加号函数和click函数同属一个节点，下面代码阻止触发click函数
      event.stopPropagation();
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      if (treeNode.type === '1')
      {
        this.$message('不能在细目节点下新增子节点!');
        return;
      }
      this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/add', { parentId: treeNode.id });
    },
    /**
     * 编辑
     * @author   yekuncai
     * @date     2019/1/16
     */
    editFn (event)
    {
      event.stopPropagation();
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      // 根节点
      if (treeNode.type === '2')
      {
        this.$message('请选择其它节点编辑!');
        return false;
      }
      // 细目节点
      else if (treeNode.type === '1')
      {
        this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/detail', { id: treeNode.id });
      }
      else
      {
        this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/edit', { id: treeNode.id });
      }
    },
    /**
     * 树节点点击回调函数
     * @author  yekuncai
     * @date    2018/6/1
     * @param   event——点击的事件信息
     * @param   treeId——树的id
     * @param   treeNode——封装了被点中的节点的信息的对象
     * @return
     */
    clickFn (event, treeId, treeNode)
    {
      let obj = {};
      // 细目节点，编辑
      if (treeNode.type === '1')
      {
        obj.id = treeNode.id;
        this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/detail', obj);
      }
      // 条目节点，获取对应的下一级节点列表
      else if (treeNode.type === '0')
      {
        obj.parentId = treeNode.id;
        this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/showList', obj);
      }
      // 根节点，获取对应的条目节点列表
      else if (treeNode.type === '2')
      {
        obj.parentId = treeNode.id;
        this.$store.dispatch('integrityPlanManagementSystem/_INDICATOR/showList', obj);
      }
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_INDICATOR', [
      'isRefreshTree',
      'treeList'
    ])
  },
  props: {
    rootId: String, // 树的根节点id
    urlType: String // 请求类型：编辑或查看
  },
  watch: {
    isRefreshTree ()
    {
      this.initTree();
    },
    rootId: {
      handler (newValue)
      {
        if (newValue !== '')
        {
          this.initTree();
        }
      },
      immediate: true
    },
    treeList (newValue)
    {
      this.metaData.treeTool = new TreeTool('subLeftTree', newValue);
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
