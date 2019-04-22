<template>
  <div class="lzy-form-wrapper">
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
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥梁检查记录</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>管理单位</th>
            <td colspan="5">
              <el-form-item label="" prop="secondDeptId">
                <el-input class="form-input" v-model="formData.secondDeptId" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>路线名称</th>
            <td>
              <el-form-item label="" prop="routeId">
                <el-input class="form-input" v-model="formData.routeId" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>桥位中心桩号</th>
            <td colspan="3">
              <el-form-item label="" prop="bripeg" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.bripeg" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>桥梁编码</th>
            <td>
              <el-form-item label="" prop="brino">
                <el-input class="form-input" v-model="formData.brino" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>桥梁名称</th>
            <td>
              <el-form-item label="" prop="briName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.briName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查单位</th>
            <td>
              <el-form-item label="" prop="checkDeptId">
                <el-input class="form-input" v-model="formData.checkDeptId" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!--<table class="form-table" width="100%">
          <colgroup>
            <col width="10%"/>
            <col width="20%"/>
            <col width="20%"/>
            <col width="25%"/>
            <col width="25%"/>
          </colgroup>
          <tr>
            <th style="text-align: center">部件编号</th>
            <th style="text-align: center">部件名称</th>
            <th style="text-align: center">缺损类型</th>
            <th style="text-align: center">缺损范围</th>
            <th style="text-align: center">保养措施意见</th>
          </tr>
          <tr v-for="item in bridgeComponent" :key="item.num">
            <td>
              <el-form-item label="" :prop="item.num">
                <el-input class="form-input" v-model="item.num" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" :prop="item.name">
                <el-input class="form-input" v-model="item.name" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" :prop="item.type">
                <form-component
                  v-model="item.type"
                  type="select"
                  :readOnly="readOnly"
                  dictionaryCode="defectType"
                ></form-component>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" :prop="item.defectRange">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="item.defectRange">
                </el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" :prop="item.suggestion">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="item.suggestion">
                </el-input>
              </el-form-item>
            </td>
          </tr>
        </table>-->
        <inline-edit-table
          title="检查记录"
          relatedTableCode="BridgeComponent"
          :initDataInfo="bridgeComponent"
          @change="bridgeComponentChange"
          :deleteUrl="$prifix.maintenance + '/mt/tm/bridgeoftencheck/removeBridgeComponent'"
          :isMinus = "false"
          :isAdd = "false"
        ></inline-edit-table>
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
                <input v-model="formData.writeUserId" v-show="false">
              </el-form-item>
            </td>
            <th>巡查时间</th>
            <td>
              <el-form-item label="" prop="fillCardDate">
                <el-date-picker
                  v-model="formData.fillCardDate"
                  value-format="yyyy-MM-dd"
                  type="date" >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>多媒体编号</th>
            <td colspan="5" height="190" class="upload-td">
              <uploader v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    inlineEditTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        bridgeComponent: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bridgeComponent = data;
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
            let bridgeComponent = JSON.stringify(this.metaData.bridgeComponent);
            Object.assign(obj, this.formData, {bridgeComponent: bridgeComponent});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEOFTENCHECK/save', obj);
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
     * @date     2018/11/18
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEOFTENCHECK/showList', null);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGEOFTENCHECK', [
      'readOnly',
      'formData',
      'deptIds',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'bridgeComponent'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
