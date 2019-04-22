<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">项目管理信息</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="项目基本信息" name="1">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th><span style="color: red;">*</span>项目名称</th>
            <td colspan="3">
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
          </el-collapse-item>
          <el-collapse-item title="建设概况" name="2">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="20%"/>
                <col width="30%"/>
                <col width="20%"/>
                <col width="30%"/>
              </colgroup>
          <tr>
            <th><span style="color: red;">*</span>建设单位</th>
            <td>
              <el-form-item label="" prop="deptId" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.deptId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>总投资</th>
            <td>
              <el-form-item label="" prop="investment" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.investment" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>终点桩号</th>
            <td>
              <el-form-item label="" prop="endStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>开始实施时间</th>
            <td>
              <el-form-item label="" prop="startDate">
                <el-date-picker v-model="formData.startDate" value-format="yyyy-MM-dd" type="year" :readonly="readOnly"></el-date-picker>
              </el-form-item>
            </td>
            <th rowspan="2">选择环节</th>
            <td rowspan="2">
              <el-form-item label="" prop="business">
                <ztree-select
                  v-if="formData.business"
                  v-model="formData.business"
                  :ztreeList="businessList"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>结束时间</th>
            <td>
              <el-form-item label="" prop="endDate">
                <el-date-picker v-model="formData.endDate" value-format="yyyy-MM-dd" type="year" :readonly="readOnly"></el-date-picker>
              </el-form-item>
            </td>
          </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="建设规模" name="3">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="20%"/>
                <col width="30%"/>
                <col width="20%"/>
                <col width="30%"/>
              </colgroup>
          <tr>
            <th>小计</th>
            <td>
              <el-form-item label="" prop="total">
                <el-input class="form-input" v-model="formData.total" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th>一级</th>
            <td>
              <el-form-item label="" prop="levelA" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.levelA" :readonly="readOnly" @change="changeTotal"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>二级</th>
            <td>
              <el-form-item label="" prop="levelB" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.levelB" :readonly="readOnly" @change="changeTotal"></el-input>
              </el-form-item>
            </td>
            <th>三级</th>
            <td>
              <el-form-item label="" prop="levelC" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.levelC" :readonly="readOnly" @change="changeTotal"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>四级</th>
            <td>
              <el-form-item label="" prop="levelD" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.levelD" :readonly="readOnly" @change="changeTotal"></el-input>
              </el-form-item>
            </td>
          </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="其他" name="4">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="20%"/>
                <col width="30%"/>
                <col width="20%"/>
                <col width="30%"/>
              </colgroup>
          <tr>
            <th>备注</th>
            <td colspan="3">
              <el-form-item label="" prop="memo">
                <el-input type="textarea" :rows="3" v-model="formData.memo" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附件</th>
            <td colspan="3" height="190" class="upload-td">
              <uploader v-model="formData.sessionId" :readOnly="readOnly">
              </uploader>
            </td>
          </tr>
          <!--
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
          </tr>-->
        </table>
          </el-collapse-item>
        </el-collapse>
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
        <!--<inline-edit-table
          title="检查记录"
          relatedTableCode="BridgeComponent"
          :initDataInfo="bridgeComponent"
          @change="bridgeComponentChange"
          :deleteUrl="$prifix.maintenance + '/sys/projectmanagement/removeBridgeComponent'"
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
        </table>-->
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
      activeNames: ['1', '2', '3', '4'],
      metaData: {
        // bridgeComponent: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bridgeComponent = data;
    },
    changeTotal ()
    {
      this.formData.total = Number(this.formData.levelA) + Number(this.formData.levelB) + Number(this.formData.levelC) + Number(this.formData.levelD);
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
            // let bridgeComponent = JSON.stringify(this.metaData.bridgeComponent);
            obj = Object.assign(obj, this.formData);
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTMANAGEMENT/save', obj);
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTMANAGEMENT/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_PROJECTMANAGEMENT', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'businessList'
      // 'bridgeComponent'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
