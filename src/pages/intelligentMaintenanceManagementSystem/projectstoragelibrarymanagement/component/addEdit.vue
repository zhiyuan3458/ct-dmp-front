<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">项目储备库管理</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="A.基础数据" name="1">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="19%"/>
                <col width="15%"/>
                <col width="19%"/>
                <col width="15%"/>
                <col width="19%"/>
                <col width="15%"/>
              </colgroup>
              <tr>
                <th><span style="color: red;"></span>项目名称</th>
                <td>
                  <el-form-item label="" prop="name" :rules="[$validate.Required]">
                    <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>项目库中项目名称</th>
                <td>
                  <el-form-item label="" prop="projectLibraryName" :rules="[$validate.Required]">
                    <el-input class="form-input" v-model="formData.projectLibraryName" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>深度贫困地区</th>
                <td>
                  <el-form-item label="" prop="deepProvertyArea">
                    <form-component
                      v-model="formData.deepProvertyArea"
                      type="select"
                      dictionaryCode="deepProvertyArea"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th><span style="color: red;">*</span>项目所属的集中连片特困区域</th>
                <td>
                  <el-form-item label="" prop="extremelyPoorAreas">
                    <form-component
                      v-model="formData.extremelyPoorAreas"
                      type="select"
                      dictionaryCode="extremelyPoorAreas"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>线路行政等级（填国道或省道）</th>
                <td>
                  <el-form-item label="" prop="lineLevel">
                    <form-component
                      v-model="formData.lineLevel"
                      type="select"
                      dictionaryCode="lineLevel"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>收费属性</th>
                <td>
                  <el-form-item label="" prop="chargeProperties">
                    <form-component
                      v-model="formData.chargeProperties"
                      type="select"
                      dictionaryCode="chargeProperties"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th rowspan="7">现状等级（公里）</th>
                <th>一级公路</th>
                <td>
                  <el-form-item label="" prop="actualFirstClassHighway">
                    <el-input class="form-input" v-model="formData.actualFirstClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th rowspan="7">建设规模（公里）</th>
                <th>一级公路</th>
                <td>
                  <el-form-item label="" prop="buildFirstClassHighway">
                    <el-input class="form-input" v-model="formData.buildFirstClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>二级公路</th>
                <td>
                  <el-form-item label="" prop="actualSecondClassHighway">
                    <el-input class="form-input" v-model="formData.actualSecondClassHighway"
                              :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>二级公路</th>
                <td>
                  <el-form-item label="" prop="buildSecondClassHighway">
                    <el-input class="form-input" v-model="formData.buildSecondClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>三级公路</th>
                <td>
                  <el-form-item label="" prop="actualThirdClassHighway">
                    <el-input class="form-input" v-model="formData.actualThirdClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>三级公路</th>
                <td>
                  <el-form-item label="" prop="buildThirdClassHighway">
                    <el-input class="form-input" v-model="formData.buildThirdClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>四级、等外或无路</th>
                <td>
                  <el-form-item label="" prop="actualOthersClassHighway">
                    <el-input class="form-input" v-model="formData.actualOthersClassHighway"
                              :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>四级公路</th>
                <td>
                  <el-form-item label="" prop="buildFourthClassHighway">
                    <el-input class="form-input" v-model="formData.buildFourthClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                </td>
                <th>独立桥梁</th>
                <td>
                  <el-form-item label="" prop="independentBridges">
                    <el-input class="form-input" v-model="formData.independentBridges" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                </td>
                <th>独立隧道</th>
                <td>
                  <el-form-item label="" prop="independentTunnel">
                    <el-input class="form-input" v-model="formData.independentTunnel" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                </td>
                <th>合计(建设规模（公里）)</th>
                <td>
                  <el-form-item label="" prop="buildHighwayTotal">
                    <el-input class="form-input" v-model="formData.buildHighwayTotal" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th rowspan="7">部印发建设规模（公里）</th>
                <th>一级公路</th>
                <td>
                  <el-form-item label="" prop="departmentFirstClassHighway">
                    <el-input class="form-input" v-model="formData.departmentFirstClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th rowspan="7">基础信息</th>
                <th>开工年（建设年限）</th>
                <td>
                  <el-form-item label="" prop="startTime">
                    <el-date-picker
                      v-model="formData.startTime"
                      value-format="yyyy-MM-dd"
                      type="date" :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>二级公路</th>
                <td>
                  <el-form-item label="" prop="departmentSecondClassHighway">
                    <el-input class="form-input" v-model="formData.departmentSecondClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>结束年（建设年限）</th>
                <td>
                  <el-form-item label="" prop="endTime">
                    <el-date-picker
                      v-model="formData.endTime"
                      value-format="yyyy-MM-dd"
                      type="date" :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>三级公路</th>
                <td>
                  <el-form-item label="" prop="departmentThirdClassHighway">
                    <el-input class="form-input" v-model="formData.departmentThirdClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>建设性质</th>
                <td>
                  <el-form-item label="" prop="buildProperties">
                    <form-component
                      v-model="formData.buildProperties"
                      type="select"
                      dictionaryCode="buildProperties"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>四级公路</th>
                <td>
                  <el-form-item label="" prop="departmentFourthClassHighway">
                    <el-input class="form-input" v-model="formData.departmentFourthClassHighway" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>部印发的“十三五”规划中拟安排车购税投资</th>
                <td>
                  <el-form-item label="" prop="planCarPurchaseTotal">
                    <el-input class="form-input" v-model="formData.planCarPurchaseTotal" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>独立桥梁</th>
                <td>
                  <el-form-item label="" prop="departmentIndependentBridges">
                    <el-input class="form-input" v-model="formData.departmentIndependentBridges" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>申请车购税投资（或已核定车购税投资）</th>
                <td>
                  <el-form-item label="" prop="carPurchaseTotal">
                    <el-input class="form-input" v-model="formData.carPurchaseTotal" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>独立隧道</th>
                <td>
                  <el-form-item label="" prop="departmentIndependentTunnel">
                    <el-input class="form-input" v-model="formData.departmentIndependentTunnel" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>总投资</th>
                <td>
                  <el-form-item label="" prop="total">
                    <el-input class="form-input" v-model="formData.total" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>合计(部印发建设规模（公里）)</th>
                <td>
                  <el-form-item label="" prop="departmentHighwayTotal">
                    <el-input class="form-input" v-model="formData.departmentHighwayTotal" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th></th>
                <td></td>
              </tr>
            </table>
            <table class="form-table" width="100%">
              <colgroup>
                <col width="19%"/>
                <col width="15%"/>
                <col width="19%"/>
                <col width="15%"/>
                <col width="25%"/>
                <col width="10%"/>
              </colgroup>
              <tr>
                <th>工可批复文号</th>
                <td>
                  <el-form-item label="" prop="approvalDocumentNumber">
                    <el-input class="form-input" v-model="formData.approvalDocumentNumber" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>初设或施工图批复文号</th>
                <td>
                  <el-form-item label="" prop="beginApprovalDocumentNumber">
                    <el-input class="form-input" v-model="formData.beginApprovalDocumentNumber" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>是否属正选与备选项目间调换（若属于，填“是”）</th>
                <td>
                  <el-form-item label="" prop="checked">
                    <form-component
                      v-model="formData.checked"
                      type="select"
                      dictionaryCode="checked"
                      :readOnly="readOnly"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="B.项目实际完成记录" name="2">
            <table class="form-table" width="100%">
              <inline-edit-table
                title=""
                relatedTableCode="projectstoragelibrarymanagementactualsub"
                :initDataInfo="listProjectStorageLibraryManagementActualSub"
                :readonly="readOnly"
                @change="projectStorageLibraryManagementActualSubChange"
                :deleteUrl="$prifix.maintenance + '/mt/pm/projectstoragelibrarymanagement/removeProjectStorageLibraryManagementActualSub'"
              ></inline-edit-table>
            </table>
          </el-collapse-item>
          <el-collapse-item title="C.项目计划完成记录" name="3">
            <table class="form-table" width="100%">
              <inline-edit-table
                title=""
                relatedTableCode="projectstoragelibrarymanagementplansub"
                :initDataInfo="listProjectStorageLibraryManagementPlanSub"
                :readonly="readOnly"
                @change="projectStorageLibraryManagementPlanSubChange"
                :deleteUrl="$prifix.maintenance + '/mt/pm/projectstoragelibrarymanagement/removeProjectStorageLibraryManagementPlanSub'"
              ></inline-edit-table>
            </table>
          </el-collapse-item>
        </el-collapse>
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
      activeNames: ['1', '2', '3', '4', '5'],
      metaData: {
        projectStorageLibraryManagementActualSub: [],
        projectStorageLibraryManagementPlanSub: [],
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
            let projectStorageLibraryManagementActualSubString = JSON.stringify(this.metaData.projectStorageLibraryManagementActualSub);
            let projectStorageLibraryManagementPlanSubString = JSON.stringify(this.metaData.projectStorageLibraryManagementPlanSub);
            Object.assign(obj, this.formData, {projectStorageLibraryManagementActualSub: projectStorageLibraryManagementActualSubString, projectStorageLibraryManagementPlanSub: projectStorageLibraryManagementPlanSubString});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/save', obj);
          }
          else
          {
            this.$message.error('数据填写格式有误!');
            return false;
          }
        });
      });
    },
    /**
       * 子表数据赋值
       * @author   gongjuncheng
       * @date     2019/1/7
       */
    projectStorageLibraryManagementActualSubChange (data)
    {
      this.metaData.projectStorageLibraryManagementActualSub = data;
    },
    projectStorageLibraryManagementPlanSubChange (data)
    {
      this.metaData.projectStorageLibraryManagementPlanSub = data;
    },
    /**
       *返回
       * @author   gongjuncheng
       * @date     2019/1/3
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT/showList', this.systemId);
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_PROJECTSTORAGELIBARYMANAGEMENT', [
      'readOnly',
      'formData',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'listProjectStorageLibraryManagementActualSub',
      'listProjectStorageLibraryManagementPlanSub',
      'readOnlyTrue'
    ])
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
  .form-table1 {
    .up-constructor {
      vertical-align: middle;
      border: 1px solid #ddd;
    }
    .down-constructor {
      vertical-align: middle;
      border: 1px solid #ddd;
    }
  }
</style>
