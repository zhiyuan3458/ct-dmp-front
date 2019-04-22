<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="culvertForm">
        <div align="left" style="font-size: 20px; padding: 9px">贵州省普通国省道公路巡查日志</div>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="15%"/>
            <col width="35%"/>
            <col width="15%"/>
            <col width="35%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th><span style="color: red;">*</span>巡查单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                  :readOnly="readOnly">
                  >
                </ztree-select>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>巡查日期</th>
            <td>
              <el-form-item label="" prop="checkDate" :rules="[$validate.Required]">
                <el-date-picker
                  style="width: 100%;"
                  v-model="formData.checkDate"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!-- 组件子表 -->
        <child-table
          title=""
          :isIndex="isIndex"
          relatedTableCode="Maintenancepatrolsub"
          :initDataInfo="listMaintenancePatrolSub"
          @change="maintenancepatrolsubChange"
          :readonly="readOnly"
          :deleteUrl="$prifix.maintenance + '/mt/cm/maintenancepatrol/removemaintenancepatrolsub'"
        ></child-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="16.9%"/>
            <col width="70%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th>当日外业巡查情况</th>
            <td>
              <div class="input-float">
                <div class="input1">
                  <el-form-item label="" prop="totalMileage" :rules="[$validate.Number]">
                    全天巡查总里程
                    <el-input class="patrol-input" :class="readOnly ? 'readonly' : ''" v-model="formData.totalMileage" :readonly="readOnly"></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="facilityDiseases" :rules="[$validate.Number]">
                    公里，发现公路设施病害
                    <el-input class="patrol-input" :class="readOnly ? 'readonly' : ''" v-model="formData.facilityDiseases" :readonly="readOnly"></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="roadManagerDiseases" :rules="[$validate.Number]">
                    件，发现沿线管理设施病害
                    <el-input class="patrol-input" :class="readOnly ? 'readonly' : ''" v-model="formData.roadManagerDiseases" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="roadpermits" :rules="[$validate.Number]">
                    件，检查路政许可事项
                    <el-input class="patrol-input" :class="readOnly ? 'readonly' : ''" v-model="formData.roadpermits" :readonly="readOnly"></el-input>件，
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="roadIllegality" :rules="[$validate.Number]">
                    发现路政违法行为
                    <el-input class="patrol-input" :class="readOnly ? 'readonly' : ''" v-model="formData.roadIllegality" :readonly="readOnly"></el-input>
                    件。
                  </el-form-item>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!--<table class="form-table" width="100%">-->
        <!--<colgroup>-->
        <!--<col v-bind:style="showWidthFlag"/>-->
        <!--<col width="250px"/>-->
        <!--<col width="100px"/>-->
        <!--<col width="80px"/>-->
        <!--<col width="100px"/>-->
        <!--<col width="100px"/>-->
        <!--<col width="360px"/>-->
        <!--</colgroup>-->
        <!--&lt;!&ndash; 父表数据 &ndash;&gt;-->
        <!--<tr>-->
        <!--<th class="form-header" >-->
        <!--序号-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--移交事项-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--事案代码（无代码则采用文字)-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--移交时间-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--移交部门负责人-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--接办企业（单位、部门）及接办人-->
        <!--</th>-->
        <!--<th class="form-header">-->
        <!--接办处治概况-->
        <!--</th>-->
        <!--</tr>-->
        <!--</table>-->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="一、养护事件汇总" name="1">
            <child-table
              :isIndex="isIndex"
              relatedTableCode="MaintenanceEvents"
              :initDataInfo="listMaintenanceEvents"
              @change="maintenanceEventsChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.maintenance + '/mt/cm/maintenancepatrol/removemaintenanceEvents'"
            ></child-table>
          </el-collapse-item>
          <el-collapse-item title="二、路政案件汇总" name="2">
            <child-table
              :isIndex="isIndex"
              relatedTableCode="Maintenanceroadcases"
              :initDataInfo="listMaintenanceRoadCases"
              @change="maintenanceroadcasesChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.maintenance + '/mt/cm/maintenancepatrol/removemaintenanceRoadCases'"
            ></child-table>
          </el-collapse-item>
          <el-collapse-item title="三、涉路预警或其他突发事件汇总" name="3">
            <child-table
              :isIndex="isIndex"
              relatedTableCode="Maintenancesuddenlyevents"
              :initDataInfo="listMaintenanceSuddenlyEvents"
              @change="maintenancesuddenlyeventsChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.maintenance + '/mt/cm/maintenancepatrol/removeMaintenanceSuddenlyevents'"
            ></child-table>
          </el-collapse-item>
          <el-collapse-item title="四、其他事件汇总" name="4">
            <child-table
              :isIndex="isIndex"
              relatedTableCode="Maintenanceotherevents"
              :initDataInfo="listMaintenanceOtherEvents"
              @change="maintenanceothereventsChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.maintenance + '/mt/cm/maintenancepatrol/removemaintenanceotherevents'"
            ></child-table>
          </el-collapse-item>
        </el-collapse>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="31%"/>
            <col width="70%"/>
          </colgroup>
          <!-- 父表数据 -->
          <tr>
            <th style="text-align: center">公路管理段主管部门负责人检查意见、签名及时间</th>
            <td>
              <div class="input-float1">
                <div class="input1" v-bind:style="borderBottomStyle='1px'">
                  <el-form-item label="" prop="head" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>负责人:
                    <el-input :class="readOnly ? 'readonly' : ''" v-model="formData.head" :readonly="readOnly">></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="headOpinion" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>检查意见:
                    <el-input :class="readOnly ? 'readonly' : ''" v-model="formData.headOpinion" :readonly="readOnly">></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="headCheckTime" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>检查时间:
                    <el-date-picker
                      :class="readOnly ? 'readonly' : ''"
                      v-model="formData.headCheckTime"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th style="text-align: center">公路管理段分管领导检查意见、签名及时间</th>
            <td>
              <div class="input-float1">
                <div class="input1">
                  <el-form-item label="" prop="chargeHead" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>负责人:
                    <el-input :class="readOnly ? 'readonly' : ''" v-model="formData.chargeHead" :readonly="readOnly"></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="chargeHeadOpinion" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>检查意见:
                    <el-input :class="readOnly ? 'readonly' : ''" v-model="formData.chargeHeadOpinion" :readonly="readOnly"></el-input>
                  </el-form-item>
                </div>
                <div class="input1">
                  <el-form-item label="" prop="chargeHeadCheckTime" :rules="[$validate.Required]">
                    <span style="color: red;">*</span>检查时间:
                    <el-date-picker
                      :class="readOnly ? 'readonly' : ''"
                      v-model="formData.chargeHeadCheckTime"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <br>
        <div style="text-align: left; font-size: 14px">注：附件1-4原件由公路管理段综合档案室归档管理，附件1和附件4保管期限30年，附件2和附件3保管期限10年。</div>
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
import customTable from '@/components/table';
import {mapGetters} from 'vuex';

export default {
  components: {
    rightNavLayout,
    formComponent,
    childTable,
    uploader,
    ztreeSelect,
    customTable
  },
  data ()
  {
    return {
      showWidthFlag: {
      },
      activeNames: ['1', '2', '3', '4'],
      style: {},
      isShowHead: false,
      metaData: {
        dialogVisible: false,
        listMaintenancePatrolSub: [],
        listMaintenanceRoadCases: [],
        listMaintenanceEvents: [],
        listMaintenanceSuddenlyEvents: [],
        listMaintenanceOtherEvents: []
      }
    };
  },

  methods: {
    /**
       * @Description: 涵洞经常检查组件记录赋值
       * @author durenniu
       * @date 2019/1/7
       */
    maintenancepatrolsubChange (data)
    {
      this.metaData.listMaintenancePatrolSub = data;
    },
    maintenanceEventsChange (data)
    {
      this.metaData.listMaintenanceEvents = data;
    },
    maintenanceroadcasesChange (data)
    {
      this.metaData.listMaintenanceRoadCases = data;
    },
    maintenancesuddenlyeventsChange (data)
    {
      this.metaData.listMaintenanceSuddenlyEvents = data;
    },
    maintenanceothereventsChange (data)
    {
      this.metaData.listMaintenanceOtherEvents = data;
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
            let listMaintenancePatrolSub = JSON.stringify(this.metaData.listMaintenancePatrolSub);
            let listMaintenanceEvents = JSON.stringify(this.metaData.listMaintenanceEvents);
            let listMaintenanceRoadCases = JSON.stringify(this.metaData.listMaintenanceRoadCases);
            let listMaintenanceSuddenlyEvents = JSON.stringify(this.metaData.listMaintenanceSuddenlyEvents);
            let listMaintenanceOtherEvents = JSON.stringify(this.metaData.listMaintenanceOtherEvents);
            Object.assign(obj, this.formData, {
              listMaintenancePatrolSub: listMaintenancePatrolSub,
              listMaintenanceEvents: listMaintenanceEvents,
              listMaintenanceRoadCases: listMaintenanceRoadCases,
              listMaintenanceSuddenlyEvents: listMaintenanceSuddenlyEvents,
              listMaintenanceOtherEvents: listMaintenanceOtherEvents
            });
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/save', obj);
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
    showWidthFn ()
    {
      if (this.showWidth === true)
      {
        this.showWidthFlag = '';
      }
      else
      {
        // this.showWidthFlag.width = '72px';
      }
    },
    /** 返回按钮事件
       * @Description:
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL/showList', null);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_MAINTENANCEPATROL', [
      'showWidth',
      'readOnly',
      'formData',
      'isLoading',
      'deptIds',
      'ztreeSelect',
      'listCulvertOftenRecord',
      'navigateMenus',
      'operateBtns',
      'isIndex',
      'readOnlyTrue',
      'listMaintenancePatrolSub',
      'listMaintenanceRoadCases',
      'listMaintenanceEvents',
      'listMaintenanceSuddenlyEvents',
      'listMaintenanceOtherEvents'
    ])
  },
  created ()
  {
    this.showWidthFn();
  },
  watch: {}

};
</script>

<style lang="less" scoped>
  .lzy-form-wrapper .form-container .form-table {
    .form-header {
      height: 100px;
      background: #EDF6FC;
      text-align: center;
      padding: 0;
      font-size: 13px;
      color: #333333;
      font-weight: bold;
    }
  }
  .readonly {
    border : 0;
  }

  .input-float {
    .input1 {
      float: left;
      /deep/ .el-input {
        input {
          text-align: center;
          border: 0;
        }
        width: 250px !important;
        border-radius: 0 !important;
        border-bottom:#8D8D8D 1px solid;
        box-shadow: 0px 0px 0px 0px !important; //去除阴影
        outline: none !important;
      }
    }
  }

  .input-float1 {
    .input1 {
      float: left;
      /deep/ .el-input {
        input {
          border: 0;
        }
        width: 270px !important;
        /*border:none !important;//去除边框*/
        border-radius:0 !important;
        border-bottom:#8D8D8D 1px solid;
        box-shadow: 0px 0px 0px 0px !important;//去除阴影
        outline:none !important;
      }
    }
    .input {
      float: right;
      /deep/ .el-input {
        input {
          border: 0;
        }
        width: 270px !important;
        /*border:none !important;//去除边框*/
        border-radius:0 !important;
        border-bottom:#8D8D8D 1px solid;
        box-shadow: 0px 0px 0px 0px !important;//去除阴影
        outline:none !important;
      }
    }
  }
</style>
