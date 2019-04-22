<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <input v-show="false" v-model="formData.bridgeType">
          <input v-show="false" v-model="formData.year">
          <input v-show="false" v-model="formData.month">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥梁技术状况评定记录表</h2>
            </th>
          </tr>
          <tr>
            <th>所属养护段</th>
            <td>
              <el-form-item label="" prop="sectionId" >
                <el-input class="form-input" v-model="formData.sectionId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>巡查单位</th>
            <td>
              <el-form-item label="" prop="thirdDeptId" >
                <ztree-select
                  v-model="formData.thirdDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>管理单位</th>
            <td>
              <el-form-item label="" prop="secondDeptId">
                <el-input class="form-input" v-model="formData.secondDeptId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>桥梁编号</th>
            <td>
              <el-form-item label="" prop="bridgeNo" >
                <el-input class="form-input" v-model="formData.bridgeNo" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>主跨结构</th>
            <td>
              <el-form-item label="" prop="mainSpanStruct" >
                <el-input class="form-input" v-model="formData.mainSpanStruct" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>上次检查时间</th>
            <td>
              <el-date-picker
                v-model="formData.beforeCheckDate"
                type="date"
                placeholder="选择日期" :readonly="readOnly" style="width: auto">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <th>桥梁名称</th>
            <td>
              <el-form-item label="" prop="bridgeName">
                <el-input class="form-input" v-model="formData.bridgeName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桥长</th>
            <td>
              <el-form-item label="" prop="bridgeLong"  :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.bridgeLong" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>建成年月</th>
            <td>
              <el-form-item label="" prop="builtDate" >
                <el-input class="form-input" v-model="formData.builtDate" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" >
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>最大跨径</th>
            <td>
              <el-form-item label="" prop="mostCrossBorder">
                <el-input class="form-input" v-model="formData.mostCrossBorder" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>本次检查日期</th>
            <td>
              <el-date-picker
                v-model="formData.nowCheckDate"
                type="date"
                placeholder="选择日期" :readonly="readOnly" style="width: auto">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <th>桥位桩号</th>
            <td>
              <el-form-item label="" prop="bridgePeg">
                <el-input class="form-input" v-model="formData.bridgePeg" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>上次大中修日期</th>
            <td>
              <el-date-picker
                v-model="formData.beforeRepairDate"
                type="date"
                placeholder="选择日期" :readonly="readOnly" style="width: auto">
              </el-date-picker>
            </td>
          </tr>
        </table>
         <!--<table class="form-table" width="100%" >
           <colgroup>
             <col width="5%"/>
             <col width="9%"/>
             <col width="9%"/>
             <col width="9%"/>
             <col width="8%"/>
             <col width="15%"/>
             <col width="15%"/>
             <col width="15%"/>
             <col width="15%"/>
           </colgroup>
           <tr>
             <th style="text-align: center" rowspan="2">编号</th>
             <th style="text-align: center"colspan="2">桥梁组成及评级</th>
             <th style="text-align: center" colspan="2">桥梁部件及评级</th>
             <th style="text-align: center" rowspan="2">维修范围</th>
             <th style="text-align: center" rowspan="2">维修方式</th>
             <th style="text-align: center" rowspan="2">维修时间</th>
             <th style="text-align: center" rowspan="2">是否需要进行特殊检查</th>
           </tr>
           <tr>
             <th style="text-align: center">桥梁组成</th>
             <th style="text-align: center">评分(100分)</th>
             <th style="text-align: center">桥梁组成</th>
             <th style="text-align: center">评分(100分)</th>
           </tr>
           <tr v-for="(item,index) in formData.listRecord" v-bind:key="item.code">
             <td>
               <el-form-item label="" prop="code">
                 <el-input class="form-input" v-model="item.code" :readonly="true" style="width: auto"></el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="bridgeFormName">
                 <el-input class="form-input" v-model="item.bridgeFormName" :readonly="true" style="width: auto"></el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="bridgeFormScore" :rules="[$validate.Number]">
                 <el-input class="form-input" v-model="item.bridgeFormScore" :readonly="true" style="width: auto"></el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="bridgeComponentName">
                 <el-input class="form-input" v-model="item.bridgeComponentName" :readonly="true" style="width: auto"></el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="bridgeComponentScore" :rules="[$validate.Number]">
                 <el-input class="form-input" v-model="item.bridgeComponentScore" :readonly="readOnly" @input="changeScoreFn(index, item)" style="width: auto"></el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="repairScope">
                 <el-input class="form-input" v-model="item.repairScope" style="width: auto" :readonly="readOnly">
                 </el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="repairMode">
                 <el-input class="form-input"
                   v-model="item.repairMode" style="width: auto" :readonly="readOnly">
                 </el-input>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="repairDate">
                 <el-date-picker
                   v-model="item.repairDate"
                   type="date"
                   placeholder="选择日期" :readonly="readOnly" style="width: auto">
                 </el-date-picker>
               </el-form-item>
             </td>
             <td>
               <el-form-item label="" prop="isRepair">
                 <el-input class="form-input"
                   v-model="item.isRepair" style="width: auto" :readonly="readOnly">
                 </el-input>
               </el-form-item>
             </td>
           </tr>
         </table>-->
        <inline-edit-table
          relatedTableCode="BridgeRegularRecord"
          :initDataInfo="listRecord"
          @change="listRecordChange"
          :objectSpanMethod="expandColFn"
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
             <th colspan="3">DR <span>一类[95,100]  二类[80,95)  三类[60,80)  四类[40,60)  五类[0,40)</span></th>
             <td colspan="3">
               <el-form-item label="" prop="totalScore" >
                 <el-input class="form-input" v-model="formData.totalScore" :readonly="true"></el-input>
               </el-form-item>
             </td>
           </tr>
           <tr>
             <th>总体技术状况等级</th>
             <td>
               <el-form-item label="" prop="totalRating">
                 <el-input class="form-input" v-model="formData.totalRating" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
             <th>全桥清洁状况等级</th>
             <td>
               <el-form-item label="" prop="fullBriScore" >
                 <el-input class="form-input" v-model="formData.fullBriScore" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
             <th>保养、小修状况评分</th>
             <td>
               <el-form-item label="" prop="repairScore">
                 <el-input class="form-input" v-model="formData.repairScore" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
           </tr>
           <tr>
             <th>养护意见</th>
             <td colspan="5">
               <el-form-item label="" prop="repairView">
                 <el-input class="form-input" v-model="formData.repairView" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
           </tr>
           <tr>
             <th>负责人</th>
             <td>
               <el-form-item label="" prop="head">
                 <el-input class="form-input" v-model="formData.head" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
             <th>记录人</th>
             <td>
               <el-form-item label="" prop="record" >
                 <el-input class="form-input" v-model="formData.record" :readonly="readOnly"></el-input>
               </el-form-item>
             </td>
             <th>下次检查时间</th>
             <td>
               <el-date-picker
                 v-model="formData.nextCheckDate"
                 type="date"
                 placeholder="选择日期" :readonly="readOnly" style="width: auto">
               </el-date-picker>
             </td>
           </tr>
           <tr>
             <th>附件</th>
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
import { expandRows } from '@/common/js/util';
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
        listRecord: []
      }
    };
  },
  methods: {
    /**
     * 改变事件
     */
    listRecordChange (data)
    {
      this.metaData.listRecord = data;
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
            // let listRecord = JSON.stringify(this.metaData.listRecord);
            let bridgeRecords = JSON.stringify(this.metaData.listRecord);
            Object.assign(obj, this.formData, {bridgeRecords: bridgeRecords});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK/save', obj);
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK/showList', {bridgeType: this.bridgeType, year: this.year, month: this.month, deptId: this.deptId});
    },
    /**
     * 分数值改变事件
     * @param data
     */
    changeScoreFn: function (index, e)
    {
      var changeValue = (e.componentWeight * e.bridgeComponentScore).toFixed(2);
      console.log(index, changeValue);
      console.log(e.componentWeight);
      e.bridgeFormScore = changeValue;
      // Object.assign(e, {bridgeFormScore: changeValue});
      // return changeValue;
    },
    expandColFn ({ row, column, rowIndex, columnIndex })
    {
      // console.log(rowIndex);
      if (columnIndex === 1)
      {
        const list = JSON.parse(this.listRecord);
        const _row = expandRows(list, 'bridgeFormName')[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        // console.log(this.rangeFn[rowIndex]);
        // console.log(expandRows(list, 'bridgeFormName'));
        // console.log('112222', _row);
        // console.log('2222', _col);
        return [_row, _col];
      }
    },
    rangeFn ()
    {
      const list = JSON.parse(this.listRecord);
      return expandRows(list, 'bridgeFormName');
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGEREGULARCHECK', [
      'readOnly',
      'formData',
      'bridgeType',
      'year',
      'month',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'listRecord'
    ])
  }
};
</script>

 <style lang="less" scoped>
 @import '../../../../common/less/common';
 </style>
