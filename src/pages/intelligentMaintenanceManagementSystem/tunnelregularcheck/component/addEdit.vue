<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <!-- 头部 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">隧道定期检查记录</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>所属养护段</th>
            <td>
                <el-form-item label="" prop="sectionId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.sectionId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查单位</th>
            <td>
              <el-form-item label="" prop="patrolDeptId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.patrolDeptId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="administrationDeptId">
                <ztree-select
                  v-model="formData.administrationDeptId"
                  :ztreeList="ztreeSelect"
                  :readOnly= 'readOnlyTrue'
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>隧道编码</th>
            <td>
              <el-form-item label="" prop="tunnelId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.tunnelId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>隧道名称</th>
            <td>
              <el-form-item label="" prop="tunnelName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.tunnelName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>上次检查时间</th>
            <td>
              <el-form-item label="" prop="beforeDate">
                <el-date-picker
                  v-model="formData.beforeDate"
                  value-format="yyyy-MM-dd"
                  type="date" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>巡查类型</th>
            <td>
              <el-form-item label="" prop="patrolType">
                <form-component
                  v-model="formData.patrolType"
                  type="select"
                  dictionaryCode="patrolType"
                  :readOnly="readOnly"
                ></form-component>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查时间</th>
            <td>
              <el-form-item label="" prop="patrolDate" :rules="[$validate.Required]">
                <el-date-picker
                  v-model="formData.patrolDate"
                  value-format="yyyy-MM-dd"
                  type="date" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="10%"/>
            <col width="10%"/>
            <col width="20%"/>
            <col width="10%"/>
            <col width="20%"/>
            <col width="10%"/>
            <col width="20%"/>
          </colgroup>
        </table>
        <!-- 子表数据 -->
        <inline-edit-table
          title="隧道定期检查记录"
          relatedTableCode="TunnelRegularRecord"
          :initDataInfo="listTunnelRegularRecord"
          :readonly="readOnly"
          @change="tunnelRegularRecordChange"
          :deleteUrl="$prifix.maintenance + '/mt/tm/tunnelregularcheck/removeTunnelRegularRecord'"
        ></inline-edit-table>
        <table class="form-table" width="100%">
          <tr>
            <th>多媒体编号</th>
            <td colspan="5" height="190" class="upload-td">
              <uploader v-model="formData.sessionId" :readonly="readOnly" >
              </uploader>
            </td>
          </tr>
        </table>
        <!--底部-->
        <table class="form-table" width="100%">
          <tr>
            <th>隧道技术状况评价</th>
            <td>
              <el-form-item label="" prop="overallEvaluation">
                <form-component
                  v-model="formData.overallEvaluation"
                  type="select"
                  dictionaryCode="rateGrade"
                  :readOnly="readOnly"
                ></form-component>
              </el-form-item>
            </td>
            <th>检查人</th>
            <td>
              <el-form-item label="" prop="checkMan">
                <el-input class="form-input" v-model="formData.checkMan" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>记录人</th>
            <td>
              <el-form-item label="" prop="record">
                <el-input class="form-input" v-model="formData.record" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import inlineEditTable from '@/components/inline-edit-table';
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    rightNavLayout,
    uploader,
    formComponent,
    inlineEditTable,
    ztreeSelect
  },
  data ()
  {
    return {
      metaData: {
        tunnelRegularRecord: [],
        loading: false
      },
      toolShow: true
    };
  },

  methods: {
    /**
     *保存信息
     * @author   gongjuncheng
     * @date     2019/1/8
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
            let tunnelRegularRecordString = JSON.stringify(this.metaData.tunnelRegularRecord);
            Object.assign(obj, this.formData, {tunnelRegularRecord: tunnelRegularRecordString});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK/save', obj);
          }
          else
          {
            this.$message('数据填写格式有误!');
            return false;
          }
        });
      });
    },
    /**
       * 隧道定期检查子表数据赋值
       * @author   gongjuncheng
       * @date     2019/1/7
       */
    tunnelRegularRecordChange (data)
    {
      this.metaData.tunnelRegularRecord = data;
    },
    /**
       *返回
       * @author   gongjuncheng
       * @date     2019/1/3
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK/showList', this.systemId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_TUNNELREGULARCHECK', [
      'readOnly',
      'systemId',
      'formData',
      'ztreeSelect',
      'isAddEditShow',
      'menuPages',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'listTunnelRegularRecord',
      'readOnlyTrue'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
