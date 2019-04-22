<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="culvertRugulerForm" v-loading="metaData.loading">
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
              <h2 align="center">涵洞定期检查记录</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>所属养护段</th>
            <td>
              <el-form-item label="" prop="sectionName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.sectionName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId"  :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                  :readOnly="readOnly"
                ></ztree-select>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>涵洞编码</th>
            <td>
              <el-form-item label="" prop="culvertCode"  :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>涵洞名称</th>
            <td>
              <el-form-item label="" prop="culvertName"  :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>涵洞桩号</th>
            <td>
              <el-form-item label="" prop="culvertPeg"  :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertPeg" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>涵洞长度</th>
            <td>
              <el-form-item label="" prop="culvertLength" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertLength" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>涵洞类型</th>
            <td>
              <el-form-item label="" prop="culvertType" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.culvertType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查时间</th>
            <td>
              <el-form-item label="" prop="patrolDate"  :rules="[$validate.Required]">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.patrolDate"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 组件子表 -->
        <child-table
          :isIndex="isIndex"
          relatedTableCode="CulvertRegularRecord"
          :initDataInfo="listCulvertRegularRecord"
          :readonly="readOnly"
          :isMinus="false"
          :isAdd="false"
          @change="culvertRegularRecordChange"
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
            <th>涵洞技术状况总评</th>
            <td colspan="5">
              <el-form-item label="" prop="overallEvaluation">
                <form-component
                  v-model="formData.overallEvaluation"
                  type="radio"
                  :readOnly="readOnly"
                  dictionaryCode="overallEvaluation"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>养护方案</th>
            <td colspan="5">
              <el-form-item label="" prop="maintenancePlan">
                <form-component
                  v-model="formData.maintenancePlan"
                  type="radio"
                  :readOnly="readOnly"
                  dictionaryCode="maintenancePlan"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>多媒体编号</th>
            <td colspan="5" height="150px">
              <uploader :btnShow="btnShow" :delBtnShow="delBtnShow" v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="6">
              <el-form-item label="" prop="memo">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="formData.memo">
                </el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>负责人</th>
            <td>
              <el-form-item label="" prop="head" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.head" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>记录人</th>
            <td>
              <el-form-item label="" prop="checkMan" :rules="[$validate.Required]">
                <el-input style="width: 100%;" class="form-input" v-model="formData.checkMan" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>下次巡查时间</th>
            <td>
              <el-form-item label="" prop="nextCheckDate" :rules="[$validate.Required]">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.nextCheckDate"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/inline-edit-table';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    formComponent,
    childTable,
    uploader,
    ztreeSelect
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        dialogVisible: false,
        listCulvertRegularRecord: []
      }
    };
  },
  methods: {
    /**
       * @Description: 涵洞经常检查组件记录赋值
       * @author durenniu
       * @date 2019/1/9
       */
    culvertRegularRecordChange (data)
    {
      this.metaData.listCulvertRegularRecord = data;
    },
    /** 表单提交
       * @Description:
       * @author durenniu
       * @date 2019/1/9
       */
    saveFn ()
    {
      // if (this.formData.belongDeptId === '' || typeof (this.formData.belongDeptId) === 'undefined' || typeof (this.formData.checkMan) === 'undefined' || this.formData.checkMan === '' || typeof (this.formData.culvertCode) === 'undefined' || (this.formData.culvertName) === 'undefined' || (this.formData.culvertPeg) === 'undefined' || this.formData.culvertCode === '' || this.formData.culvertName === '' || this.formData.culvertPeg === '' || (this.formData.patrolDate) === 'undefined' || this.formData.patrolDate === '')
      // {
      //   this.$message({
      //     showClose: true,
      //     message: '警告，请确认填充完整必填数据',
      //     type: 'warning'
      //   });
      //   return false;
      // }
      this.$confirm('确认保存数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['culvertRugulerForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            let listCulvertRegularRecord = JSON.stringify(this.metaData.listCulvertRegularRecord);
            Object.assign(obj, this.formData, {listCulvertRegularRecord: listCulvertRegularRecord});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTREGULARCHECK/save', obj);
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
       * @date 2019/1/9
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_CULVERTREGULARCHECK/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_CULVERTREGULARCHECK', [
      'readOnly',
      'formData',
      'deptId',
      'btnShow',
      'delBtnShow',
      'ztreeSelect',
      'listCulvertRegularRecord',
      'navigateMenus',
      'operateBtns',
      'isIndex',
      'isLoading'
    ])
  }
};
</script>

<style lang="less">
  .inline-edit-table-container[data-v-d4852c3c] .el-input__inner{
    text-align: center;
}
</style>
<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
