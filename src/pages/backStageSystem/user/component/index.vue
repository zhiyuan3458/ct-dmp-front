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
        treeLevel: [],
        setting: {
          view: {
            showIcon: false,
            selectedMulti: false,
            addDiyDom: this.$common.addDiyDom
          },
          edit: {
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false
          },
          data: {
            key: {
              name: 'text'
            },
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'parentId'
            }
          }
        }
      }
    };
  },
  methods: {
    /**
     * 初始化或更新subLeftTree树
     * @author   yekuncai
     * @date     2018/10/22
     */
    initTree ()
    {
      this.$store.dispatch('backStageSystem/_USER/getTree').then(data =>
      {
        let level = 1;
        this.metaData.treeTool = new TreeTool('subLeftTree', data.ztreeList, false);
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
     * @author   chenguang
     * @date     2018/10/4
     */
    clickFn (event, treeId, treeNode)
    {
      this.$store.dispatch('backStageSystem/_USER/showList', treeNode.id);
    },
    /**
     * 添加用户
     * @author   chenguang
     * @date     2018/10/4
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
        this.$store.dispatch('backStageSystem/_USER/add', {type: 0, parentId: treeNode.id});
      }
      else
      { // 数据内容节点新增数据信息
        this.$store.dispatch('backStageSystem/_USER/add', {type: 0, parentId: treeNode.parentId, value: treeNode.code, name: treeNode.text});
      }
      this.$common.stopEvent(event);
    },
    // 点击侧导航栏的上部图标触发
    clickTopBtn (e)
    {
      let iconClass = e.target.className;
      var treeObj = $.fn.zTree.getZTreeObj('subLeftTree');
      if (iconClass.indexOf('ct-icon-folder-collaspe') >= 0)
      {
        treeObj.expandAll(false);
      }
      else
      {
        treeObj.expandAll(true);
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
    this.$store.dispatch('backStageSystem/_USER/addEdit', {type: type, parentId: treeNode.id});
    this.$common.stopEvent(event);
  },
  computed: {
    ...mapGetters('backStageSystem/_USER', [
      'treeList'
    ])
  },
  watch: {
    /**
     * 观察树的数据是否发生变化，有的话立即更新
     * @param newValue
     * @param oldValue
     */
    treeList (newValue, oldValue)
    {
      if (newValue.length !== 0)
      {
        this.metaData.treeTool = new TreeTool('subLeftTree', this.treeList, false);
        let arr = this.indexTreeOperateBtns.split(',');
        let length = arr.length;
        let map = new Map();
        for (let i = 0; i < length; i++)
        {
          map.set(arr[i], Reflect.get(this, arr[i + 1]));
          i++;
        }
        this.metaData.treeTool.setOperatePrivilege(map);
        this.metaData.treeTool.setOnClick(this.clickFn);
        this.metaData.treeTool.init('/base/sys/bs/dept/dragDrop', this.beforeDrop);
      }
    }
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
</style>
