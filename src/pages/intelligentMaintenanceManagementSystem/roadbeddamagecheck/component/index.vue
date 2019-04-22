<template>
  <div class="form-bar-content-wrapper">
    <el-form ref="formData" label-width="50px">
      <el-form-item label="路线">
        <el-input class="form-input" placeholder="(双击选择)" @focus="choiceCulvertData" v-model="routeCode"></el-input>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="investigateDirection" placeholder="请选择">
          <el-option label="选择" value=""></el-option>
          <el-option label="上行" value="上行"></el-option>
          <el-option label="下行" value="下行"></el-option>
          <el-option label="双向" value="双向"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份">
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="请选择"
          format="yyyy 年"
          value-format="yyyy">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="请选择"
          format="MM 月"
          value-format="MM">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="formBarTable-button" icon="el-icon-search" type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden>
    </custom-dialog>
    <el-scrollbar :native = true><list v-if="isListShow"></list></el-scrollbar>
  </div>
</template>

<script>
import formComponent from '@/components/formComponent';
import list from '../component/list';
import { mapGetters } from 'vuex';
import customDialog from '@/components/dialog';
export default {
  components: {
    customDialog,
    formComponent,
    list
  },
  data ()
  {
    return {
      collapseObj: {
        width: 309,
        draggable: true,
        collapsable: true
      },
      routeCode: '',
      investigateDirection: '',
      year: '',
      month: '',
      metaData: {
        dialogVisible: false,
        readOnly: true
      }
    };
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK', [
      'isListShow'
    ])
  },
  methods: {
    choiceCulvertData ()
    {
      this.metaData.dialogVisible = true;
    },
    submitForm ()
    {
      let formCondition = {routeCode: this.routeCode, investigateDirection: this.investigateDirection, month: this.month, year: this.year};
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK/listJson', {
        routeCode: formCondition.routeCode,
        investigateDirection: formCondition.investigateDirection,
        month: formCondition.month,
        year: formCondition.year
      });
    },
    initSelectTree ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_ROADBEDDAMAGECHECK/getTree').then(data =>
      {
      });
    }
  },
  mounted ()
  {
    /**
     * 初始化树
     */
    this.initSelectTree();
  }

};
</script>

<style scoped lang="less">
  @import '../../../../common/less/common';
</style>
