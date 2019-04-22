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
     * 初始化ztree树
     * @author   chenguang
     * @date     2018/11/16
     */
    initTree ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADGREENING/getTree').then(data =>
      {
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
        this.metaData.treeTool.expandLevel('subLeftTree', 3);
      });
    },
    /**
     * 树节点点击回调函数
     * @author   chenguang
     * @date     2018/11/16
     */
    clickFn (event, treeId, treeNode)
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADGREENING/showList', treeNode.id);
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
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADGREENING', [
      'treeList',
      'indexTreeOperateBtns'
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
</style>
