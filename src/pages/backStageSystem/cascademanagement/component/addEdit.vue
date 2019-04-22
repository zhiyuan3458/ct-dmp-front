<template>
    <div class="lzy-form-wrapper" v-if="isAddEditShow" v-loading.lock="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
      ></right-nav-layout>
      <div class="cascade-tree-container">
        <tree-collapse-bar
          class="collapse-bar"
          :collapsedWrapper="style.collapsedWrapper"
          :treeObj="metaData.treeTool"
          treeId="cascadeTree"
        >
          <ul slot="tree" id="cascadeTree" class="ztree" style="height: 300px"></ul>
        </tree-collapse-bar>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import TreeTool from '@/class/ztreeTool/treeTool';
import treeCollapseBar from '@/components/treeCollapseBar';
export default {
  components: {
    rightNavLayout,
    treeCollapseBar
  },
  data ()
  {
    return {
      style: {
        isShow: false,
        collapsedWrapper: {
          width: 270, // 设置初始宽度
          draggable: false, // 是否可拖拽
          collapsable: false // 是否可伸缩
        }
      },
      metaData: {
        treeTool: null,
        treeLevel: []
      }
    };
  },
  methods: {
    /**
     * 添加数据字典的数据内容节点
     * @author   chenguang
     * @date     2018/9/30
     */
    addFn (event)
    {
      let treeNode = this.metaData.treeTool.getSelectNode(event);
      // var treeObj = this.metaData.treeTool.getZTreeObj(treeNode.id);
      let newNode = { name: 'newNode1' };
      newNode = treeNode.addNodes(null, newNode);
      console.log(newNode);
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
        this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/remove', {
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
    },
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            // id为空说明是新增的
            if (this.formData.id === '')
            {
            }
            else
            {
              obj = this.formData;
            }
            this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   chenguang
     * @date     2018/10/16
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_CASCADEMANAGEMENT/showList');
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_CASCADEMANAGEMENT', [
      'formData',
      'readOnly',
      'navigateMenus',
      'operateBtns',
      'treeBtns',
      'isAddEditShow',
      'isLoading'
    ])
  },
  watch: {
    formData ()
    {
      setTimeout(() =>
      {
        if (this.formData !== null)
        {
          this.metaData.treeTool = new TreeTool('cascadeTree', this.formData);
          let treeBtns = this.treeBtns;
          let length = treeBtns.length;
          let map = new Map();
          for (let i = 0; i < length; i++)
          {
            let key = {name: treeBtns[i].displayValue, icon: treeBtns[i].icon};
            map.set(key, Reflect.get(this, `${treeBtns[i].displayValue}Fn`));
          }
          this.metaData.treeTool.setOperatePrivilege(map);
          this.metaData.treeTool.setOnClick(this.clickFn);
          this.metaData.treeLevel = this.metaData.treeTool.getTreeLevel('cascadeTree');
          this.$emit('getLevel', {
            treeObj: this.metaData.treeTool,
            treeLevel: this.metaData.treeLevel
          });
          this.metaData.treeTool.expandLevel('cascadeTree', 3);
        }
      }, 20);
    }
  }
};
</script>

<style lang="less">
@import '../../../../common/less/common';
.cascade-tree-container {
  height: calc(100% - 62px);
}
</style>
