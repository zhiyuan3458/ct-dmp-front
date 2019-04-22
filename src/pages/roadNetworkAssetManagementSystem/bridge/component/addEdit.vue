<template>
  <div class="lzy-form-wrapper" v-loading.fullscreen.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      :qrCodeData="qrCodeData"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥梁卡片</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="A.行政识别数据" name="1">
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
                <th><span style="color: red;">*</span>路线编号</th>
                <td>
                  <el-form-item label="" prop="routeCode">
                    <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>路线名称</th>
                <td>
                  <el-form-item label="" prop="routeName">
                    <el-input class="form-input" v-model="formData.routeName" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>路线等级</th>
                <td>
                  <el-form-item label="" prop="routeGrade">
                    <el-input class="form-input" v-model="formData.routeGrade" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th><span style="color: red;">*</span>桥梁编号</th>
                <td>
                  <el-form-item label="" prop="code">
                    <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>桥梁名称</th>
                <td>
                  <el-form-item label="" prop="name">
                    <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>桥梁规模类型</th>
                <td>
                  <el-form-item label="" prop="scaleType">
                    <form-component
                      v-model="formData.scaleType"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="bridgeType"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>构造类型</th>
                <td>
                  <el-form-item label="" prop="structureType">
                    <el-input class="form-input" v-model="formData.structureType" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>管理单位</th>
                <td>
                  <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                    <ztree-select
                      v-model="formData.belongDeptId"
                      :ztreeList="ztreeSelect"
                      :readOnly="readOnly"
                    ></ztree-select>
                  </el-form-item>
                </td>
                <th>原始桩号</th>
                <td>
                  <el-form-item label="" prop="originalStake" :rules="[$validate.Pile]">
                    <el-input class="form-input" v-model="formData.originalStake" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>起始桩号</th>
                <td>
                  <el-form-item label="" prop="startStake">
                    <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>终点桩号</th>
                <td>
                  <el-form-item label="" prop="endStake">
                    <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>纠正桩号</th>
                <td>
                  <el-form-item label="" prop="correctStake">
                    <el-input class="form-input" v-model="formData.correctStake" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th><span style="color: red;">*</span>桥位中心桩号</th>
                <td>
                  <el-form-item label="" prop="pileId">
                    <el-input class="form-input" v-model="formData.pileId" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>经纬度</th>
                <td style="position: relative;">
                  <el-form-item label="" prop="coordinate">
                    <!--<el-input class="form-input" v-model="formData.coordinate" :readonly="true"></el-input>-->
                    <lat-lng-position
                      v-model="formData.coordinate"
                      :readonly="readOnly"
                    ></lat-lng-position>
                  </el-form-item>
                </td>
                <th>是否移交</th>
                <td>
                  <el-form-item label="" prop="isHandOver">
                    <form-component
                      v-model="formData.isHandOver"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="yesNo"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>桥梁左右幅</th>
                <td>
                  <el-form-item label="" prop="bridgePainting">
                    <form-component
                      v-model="formData.bridgePainting"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="bridgePainting"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>桥面铺装</th>
                <td>
                  <el-form-item label="" prop="deck">
                    <el-input class="form-input" v-model="formData.deck" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>弯斜坡度</th>
                <td>
                  <el-form-item label="" prop="curveSlope">
                    <el-input class="form-input" v-model="formData.curveSlope" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>功能类型</th>
                <td>
                  <el-form-item label="" prop="functionType">
                    <el-input class="form-input" v-model="formData.functionType" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>下穿通道名</th>
                <td>
                  <el-form-item label="" prop="beneathChannelName">
                    <el-input class="form-input" v-model="formData.beneathChannelName" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>下穿通道桩号</th>
                <td>
                  <el-form-item label="" prop="beneathChannelStake">
                    <el-input class="form-input" v-model="formData.beneathChannelStake" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>设计荷载</th>
                <td>
                  <el-form-item label="" prop="designLoad">
                    <el-input class="form-input" v-model="formData.designLoad" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>通行载重</th>
                <td>
                  <el-form-item label="" prop="trafficLoad">
                    <el-input class="form-input" v-model="formData.trafficLoad" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>建成年月/设计使用年限</th>
                <td>
                  <el-form-item label="" prop="completionLife">
                    <el-input class="form-input" v-model="formData.completionLife" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="B.结构技术数据" name="2">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <!-- B数据 -->
              <tr>
                <th>桥长（m）</th>
                <td>
                  <el-form-item label="" prop="length">
                    <el-input class="form-input" v-model="formData.length" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>桥面总宽（m）</th>
                <td>
                  <el-form-item label="" prop="deckWidth">
                    <el-input class="form-input" v-model="formData.deckWidth" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>车行道宽（m）</th>
                <td>
                  <el-form-item label="" prop="roadwayWidth">
                    <el-input class="form-input" v-model="formData.roadwayWidth" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>桥面标高（m）</th>
                <td>
                  <el-form-item label="" prop="deckElevation">
                    <el-input class="form-input" v-model="formData.deckElevation" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>桥下净高（m）</th>
                <td>
                  <el-form-item label="" prop="subHeight">
                    <el-input class="form-input" v-model="formData.subHeight" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>桥上净高（m）</th>
                <td>
                  <el-form-item label="" prop="upperHeight">
                    <el-input class="form-input" v-model="formData.upperHeight" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>引道总宽（m）</th>
                <td>
                  <el-form-item label="" prop="approachWidth">
                    <el-input class="form-input" v-model="formData.approachWidth" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>引道路面宽（m）</th>
                <td>
                  <el-form-item label="" prop="citedWidth">
                    <el-input class="form-input" v-model="formData.citedWidth" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>引道线形</th>
                <td>
                  <el-form-item label="" prop="linearApproach">
                    <el-input class="form-input" v-model="formData.linearApproach" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
            <table class="form-table1" width="100%">
              <colgroup>
                <col width="4%"/>
                <col width="46%"/>
                <col width="4%"/>
                <col width="46%"/>
              </colgroup>
              <!-- B数据 -->
              <tr>
                <td rowspan="3" class="up-constructor">上部结构</td>
                <td class="child-table-container">
                  <div class="child-table-wrapper">
                    <child-table
                      title=""
                      relatedTableCode="BridgeSupStructure"
                      :initDataInfo="listBridgeSupStructure"
                      @change="bridgeSupStructureChange"
                      :readonly="readOnly"
                      :deleteUrl="$prifix.roadnetwork + '/rn/bd/bridge/removeBridgeSupStructure'"
                    ></child-table>
                  </div>
                </td>
                <td rowspan="3" class="down-constructor">下部结构</td>
                <td class="child-table-container">
                  <div class="child-table-wrapper">
                    <child-table
                      title=""
                      relatedTableCode="BridgeSubStructure"
                      :initDataInfo="listBridgeSubStructure"
                      @change="bridgeSubStructureChange"
                      :readonly="readOnly"
                      :deleteUrl="$prifix.roadnetwork + '/rn/bd/bridge/removeBridgeSubStructure'"
                    ></child-table>
                  </div>
                </td>
              </tr>
            </table>
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="13%"/>
                <col width="21%"/>
              </colgroup>
              <tr>
                <th>伸缩缝类型</th>
                <td>
                  <el-form-item label="" prop="expansionType">
                    <el-input class="form-input" v-model="formData.expansionType" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>支座形式</th>
                <td>
                  <el-form-item label="" prop="supportForm">
                    <el-input class="form-input" v-model="formData.supportForm" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>地震动峰值加速度系数</th>
                <td>
                  <el-form-item label="" prop="peakCoefficient">
                    <el-input class="form-input" v-model="formData.peakCoefficient" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>桥台护坡</th>
                <td>
                  <el-form-item label="" prop="abutment">
                    <el-input class="form-input" v-model="formData.abutment" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>护墩体</th>
                <td>
                  <el-form-item label="" prop="spier">
                    <el-input class="form-input" v-model="formData.spier" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>调治构造物</th>
                <td>
                  <el-form-item label="" prop="modulate">
                    <el-input class="form-input" v-model="formData.modulate" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>常水位</th>
                <td>
                  <el-form-item label="" prop="normalLevel">
                    <el-input class="form-input" v-model="formData.normalLevel" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>设计水位</th>
                <td>
                  <el-form-item label="" prop="designLevel">
                    <el-input class="form-input" v-model="formData.designLevel" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>历史洪水位</th>
                <td>
                  <el-form-item label="" prop="historicalFloodLevel">
                    <el-input class="form-input" v-model="formData.historicalFloodLevel" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="C.档案资料（全、不全、无）" name="3">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <!-- C数据 -->
              <tr>
                <th>设计图纸</th>
                <td>
                  <el-form-item label="" prop="designDrawing">
                    <form-component
                      v-model="formData.designDrawing"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>设计文件</th>
                <td>
                  <el-form-item label="" prop="designFile">
                    <form-component
                      v-model="formData.designFile"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>施工文件</th>
                <td>
                  <el-form-item label="" prop="constructDocument">
                    <form-component
                      v-model="formData.constructDocument"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>竣工图纸</th>
                <td>
                  <el-form-item label="" prop="finBuiltDrawing">
                    <form-component
                      v-model="formData.finBuiltDrawing"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>验收文件</th>
                <td>
                  <el-form-item label="" prop="acceptanceDocument">
                    <form-component
                      v-model="formData.acceptanceDocument"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>行政文件</th>
                <td>
                  <el-form-item label="" prop="administrativeDocument">
                    <form-component
                      v-model="formData.administrativeDocument"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>定期检查报告</th>
                <td>
                  <el-form-item label="" prop="regularCheckReport">
                    <form-component
                      v-model="formData.regularCheckReport"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>特殊检查报告</th>
                <td>
                  <el-form-item label="" prop="specialCheckReport">
                    <form-component
                      v-model="formData.specialCheckReport"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>历史维修资料</th>
                <td>
                  <el-form-item label="" prop="maintainPreference">
                    <form-component
                      v-model="formData.maintainPreference"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>档案号</th>
                <td>
                  <el-form-item label="" prop="recordNo">
                    <el-input class="form-input" v-model="formData.recordNo" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>存档案</th>
                <td>
                  <el-form-item label="" prop="registerFile">
                    <form-component
                      v-model="formData.registerFile"
                      type="select"
                      :readOnly="readOnly"
                      dictionaryCode="referenceType"
                    ></form-component>
                  </el-form-item>
                </td>
                <th>建档年/月</th>
                <td>
                  <el-form-item label="" prop="filingYear">
                    <el-date-picker
                      v-model="formData.filingYear"
                      type="date"
                      :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="D:技术状况评定" name="4">
            <child-table
              title=""
              relatedTableCode="BridgeTech"
              :initDataInfo="listBridgeTech"
              @change="bridgeTechChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.roadnetwork + '/rn/bd/bridge/removeBridgeTech'"
            ></child-table>
          </el-collapse-item>
          <el-collapse-item title="E:修建记录" name="5">
            <child-table
              title=""
              relatedTableCode="BridgeRecord"
              :initDataInfo="listBridgeRecord"
              @change="bridgeRecordChange"
              :readonly="readOnly"
              :deleteUrl="$prifix.roadnetwork + '/rn/bd/bridge/removeBridgeRecord'"
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
                <th>附注:</th>
                <td colspan="5">
                  <el-form-item label="" prop="memo">
                    <el-input
                      type="textarea"
                      v-model="formData.memo">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>桥面立面照(300*200)</th>
                <td colspan="2">
                  <uploader v-model="formData.verticalView" uploadUrl="/api/upload/sys/at/attachment/uploadBridgeView" :multiple="false" accept="image/*">
                  </uploader>
                </td>
                <th>桥面正面照(300*200)</th>
                <td colspan="2">
                  <uploader v-model="formData.frontalView" uploadUrl="/api/upload/sys/at/attachment/uploadBridgeView" :multiple="false" accept="image/*">
                  </uploader>
                </td>
              </tr>
              <tr>
                <th>桥梁附件</th>
                <td colspan="5">
                  <uploader v-model="formData.sessionId">
                  </uploader>
                </td>
              </tr>
              <tr>
                <th>主管负责人</th>
                <td>
                  <el-form-item label="" prop="mainPrincipal">
                    <el-input style="width: 100%;" class="form-input" v-model="formData.mainPrincipal" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>填卡人</th>
                <td>
                  <el-form-item label="" prop="writeUserName">
                    <el-input style="width: 100%;" class="form-input" v-model="formData.writeUserName" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>填卡日期</th>
                <td>
                  <el-form-item label="" prop="fillcardDate">
                    <el-date-picker
                      v-model="formData.fillcardDate"
                      type="date"
                      :readonly="readOnly">
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import latLngPosition from '@/components/latLngPosition';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader,
    childTable,
    latLngPosition,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      activeNames: ['1', '2', '3', '4', '5'],
      metaData: {
        bridgeTech: [],
        bridgeRecord: [],
        bridgeSubStructure: [],
        bridgeSupStructure: []
      }
    };
  },
  methods: {
    /**
     * 桥梁技术状况评定子表数据赋值
     * @author   chenguang
     * @date     2018/12/4
     */
    bridgeTechChange (data)
    {
      this.metaData.bridgeTech = data;
    },
    /**
     * 桥梁修建记录子表数据赋值
     * @author   chenguang
     * @date     2018/12/4
     */
    bridgeRecordChange (data)
    {
      this.metaData.bridgeRecord = data;
    },
    /**
     * 桥梁下部结构子表数据赋值
     * @author   chenguang
     * @date     2018/12/4
     */
    bridgeSubStructureChange (data)
    {
      this.metaData.bridgeSubStructure = data;
    },
    /**
     * 桥梁上部结构子表数据赋值
     * @author   chenguang
     * @date     2018/12/4
     */
    bridgeSupStructureChange (data)
    {
      this.metaData.bridgeSupStructure = data;
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
            let bridgeTech = JSON.stringify(this.metaData.bridgeTech);
            let bridgeRecord = JSON.stringify(this.metaData.bridgeRecord);
            let bridgeSubStructure = JSON.stringify(this.metaData.bridgeSubStructure);
            let bridgeSupStructure = JSON.stringify(this.metaData.bridgeSupStructure);
            Object.assign(obj, this.formData, {bridgeTech: bridgeTech, bridgeRecord: bridgeRecord, bridgeSubStructure: bridgeSubStructure, bridgeSupStructure: bridgeSupStructure});
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_BRIDGE/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_BRIDGE', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'listBridgeTech',
      'listBridgeRecord',
      'listBridgeSubStructure',
      'listBridgeSupStructure',
      'navigateMenus',
      'operateBtns',
      'qrCodeData',
      'isLoading'
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
