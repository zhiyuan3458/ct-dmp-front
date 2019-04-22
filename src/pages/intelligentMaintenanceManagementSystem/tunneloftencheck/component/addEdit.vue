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
              <h2 style="text-align: center">隧道经常检查记录</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
                <el-form-item label="" prop="routeId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
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
            <th>天气</th>
            <td>
              <el-form-item label="" prop="weather" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.weather" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>隧道编码</th>
            <td>
              <el-form-item label="" prop="tunnelId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.tunnelId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;"></span>隧道名称</th>
            <td>
              <el-form-item label="" prop="tunnelName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.tunnelName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;"></span>巡查时间</th>
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
          title="隧道经常检查记录"
          relatedTableCode="TunnelOftenRecord"
          :initDataInfo="listTunnelOftenRecord"
          :readonly="readOnly"
          @change="tunnelOftenRecordChange"
          :deleteUrl="$prifix.maintenance + '/mt/tm/tunneloftencheck/removeTunnelOftenRecord'"
        ></inline-edit-table>
        <table class="form-table" width="100%">
          <tr>
            <th>多媒体编号</th>
            <td colspan="5" height="190" class="upload-td">
              <uploader v-model="formData.sessionId"  :readonly="readOnly">
              </uploader>
            </td>
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
          </tr>
        </table>
        <!--底部-->
        <table class="form-table" width="100%">
          <tr>
            <th>监察人</th>
            <td>
              <el-form-item label="" prop="supervisor">
                <el-input class="form-input" v-model="formData.supervisor" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>负责人</th>
            <td>
              <el-form-item label="" prop="head">
                <el-input class="form-input" v-model="formData.head" :readonly="readOnly"></el-input>
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
        tunnelOftenRecord: [],
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
            let tunnelOftenRecordString = JSON.stringify(this.metaData.tunnelOftenRecord);
            Object.assign(obj, this.formData, {tunnelOftenRecord: tunnelOftenRecordString});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/save', obj);
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
    tunnelOftenRecordChange (data)
    {
      this.metaData.tunnelOftenRecord = data;
    },
    /**
       *返回
       * @author   gongjuncheng
       * @date     2019/1/3
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK/showList', this.systemId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_TUNNELOFTENCHECK', [
      'readOnly',
      'formData',
      'isAddEditShow',
      'menuPages',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'ztreeSelect',
      'listTunnelOftenRecord',
      'readOnlyTrue'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
</style>
