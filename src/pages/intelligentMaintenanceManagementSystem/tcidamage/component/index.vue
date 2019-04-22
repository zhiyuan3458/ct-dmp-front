<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="50px">
      <el-form-item label="路线">
        <el-input class="form-input" placeholder="(双击选择)" @focus="routeDialogFn" v-model="routeCode"></el-input>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="year"
          type="year"
          format="yyyy年"
          value-format="yyyy"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="month"
          type="month"
          format="M月"
          value-format="M"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden>
    </custom-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
// import TreeTool from '@/class/ztreeTool/treeTool';
import customDialog from '@/components/dialog';
export default {
  components: {
    customDialog
  },
  data ()
  {
    return {
      deptIds: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      metaData: {
        dialogVisible: false,
        readOnly: true
      }
    };
  },
  methods: {
    /** initTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TCIDAMAGE/getTree').then(data =>
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
    clickFn (event, treeId, treeNode)
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TCIDAMAGE/showList', treeNode.id);
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
    }**/
    routeDialogFn ()
    {
      this.metaData.dialogVisible = true;
    },
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      let formCondition = {deptIds: this.deptIds, month: this.month, year: this.year};
      if (this.year === '' || this.year === null)
      {
        delete formCondition[`year`];
      }
      if (this.month === '' || this.month === null)
      {
        delete formCondition[`month`];
      }
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TCIDAMAGE/showList', formCondition);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_TCIDAMAGE', [
      'isListShow'
      // 'treeList',
      // 'indexTreeOperateBtns'
    ])
  },
  mounted ()
  {
    /**
     * 初始化树
     * @param newValue
     * @param oldValue
     */
    // this.initTree();
    // this.$store.dispatch('intelligentMaintenanceManagementSystem/_TCIDAMAGE/showList');
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
