<template>
  <!-- 树形结构工具栏 -->
  <div class="form-bar-content-wrapper">
    <el-form ref="form" label-width="80px">
      <el-form-item label="管理单位">
        <ztree-select
          v-model="deptId"
          :ztreeList="ztreeList"
          :readOnly="false"
        ></ztree-select>
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
      <el-form-item label="桥梁类型" prop="bridgeType">
        <form-component
          v-model="bridgeType"
          type="select"
          dictionaryCode="bridgeCheckType" initValue="beamBridge"
        ></form-component>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import formComponent from '@/components/formComponent';
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    formComponent,
    ztreeSelect
  },
  data ()
  {
    return {
      deptId: '', // 用户个人的部门Id(默认情况下选第一个)
      month: '',
      year: '',
      bridgeType: '',
      ztreeList: []
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK/getTree').then(data =>
      {
        this.deptIds = data.deptId;
        this.ztreeList = data.ztreeList;
      });
    },
    submitForm ()
    {
      /**
       * 在此处添加判断，如哪些条件是必须的
       */
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK/showList', {year: this.year, month: this.month, bridgeType: this.bridgeType, deptId: this.deptId});
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK', [
      'treeList'
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
  /deep/.el-menu{
    border: 0px;
  }
  /deep/.el-col-12{
    width: 100%;
  }
</style>
