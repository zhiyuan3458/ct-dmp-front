<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="culvertForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 align="center">涵洞经常检查记录</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly= 'readOnly'></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red">*</span>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeName" :readonly = 'readOnly'></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red">*</span>管养单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                  :readOnly= 'readOnly'
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red">*</span>涵洞编号</th>
            <td>
              <el-form-item label="" prop="culvertCode" :rules="[$validate.Required]">
                <el-input class="form-input" placeholder="(双击选择)" @focus="choiceCulvertData" v-model="formData.culvertCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red">*</span>涵洞桩号</th>
            <td>
              <el-form-item label="" prop="culvertPeg" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertPeg" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red">*</span>检查日期</th>
            <td>
              <el-form-item label="" prop="checkDate" :rules="[$validate.Required]">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.checkDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 组件子表 -->
        <child-table
          :isIndex = "IsIndex"
          relatedTableCode="CulvertOftenRecord"
          :initDataInfo="listCulvertOftenRecord"
          @change="culvertOftenRecordChange"
          :readonly="readOnly"
          :isMinus="false"
          :isAdd="false"
        ></child-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <tr>
            <th><span style="color: red">*</span>负责人</th>
            <td>
              <el-form-item label="" prop="head" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.head" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red">*</span>检查人</th>
            <td>
              <el-form-item label="" prop="checkMan" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.checkMan" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附件</th>
            <td colspan="5" height="200px">
              <uploader :btnShow="btnShow" :delBtnShow="delBtnShow" v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <custom-dialog title="" :visible.sync="metaData.dialogVisible" isHidden>
      <!--<right-nav-layout-->
        <!--:btnList="operateBtns"-->
        <!--:breadcrumbs="navigateMenus"-->
      <!--&gt;</right-nav-layout>-->
      <!--<custom-table-->
        <!--:tableList="tableList"-->
        <!--:gridEntityInfo="gridEntityInfo"-->
        <!--:tableBtns="tableBtns"-->
        <!--:listGridColumnInfo="listGridColumnInfo"-->
        <!--:isLoading="isLoading"-->
      <!--&gt;</custom-table>-->
    </custom-dialog>
  </div>
</template>

<script>
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/inline-edit-table';
import formComponent from '@/components/formComponent';
import customDialog from '@/components/dialog';
import customTable from '@/components/table';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    formComponent,
    childTable,
    uploader,
    ztreeSelect,
    customDialog,
    customTable
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        dialogVisible: false,
        listCulvertOftenRecord: []
      }
    };
  },
  methods: {
    choiceCulvertData ()
    {
      console.log('测试');
      this.metaData.dialogVisible = true;
    },
    initData ()
    {
      // this.metaData.listCulvertOftenRecord = JSON.parse(type.LISTCULVERTOFTENRECORD);
      // this.$store.commit('intelligentMaintenanceManagementSystem/_CULVERTOFTENCHECK/LIST_CULVERT', JSON.stringify(this.metaData.listCulvertOftenRecord.data.listCulvertOftenRecord));
    },
    /**
     * @Description: 涵洞经常检查组件记录赋值
     * @author durenniu
     * @date 2019/1/7
    */
    culvertOftenRecordChange (data)
    {
      this.metaData.listCulvertOftenRecord = data;
    },
    /** 表单提交
     * @Description:
     * @author durenniu
     * @date 2019/1/7
    */
    saveFn ()
    {
      this.$confirm('确认保存数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['culvertForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            let culvertOftenRecord = JSON.stringify(this.metaData.listCulvertOftenRecord);
            Object.assign(obj, this.formData, {culvertOftenRecord: culvertOftenRecord});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTOFTENCHECK/save', obj);
          }
          else
          {
            this.$message({
              showClose: true,
              type: 'info',
              message: '填写数据完整或正确!'
            });
            return false;
          }
        });
      });
    },
    /** 返回按钮事件
     * @Description:
     * @author durenniu
     * @date 2019/1/7
    */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTOFTENCHECK/showList', null);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_CULVERTOFTENCHECK', [
      'readOnly',
      'formData',
      'deptId',
      'btnShow',
      'delBtnShow',
      'ztreeSelect',
      'listCulvertOftenRecord',
      'navigateMenus',
      'operateBtns',
      'IsIndex',
      'readOnlyTrue'
    ])
  },
  mounted ()
  {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
