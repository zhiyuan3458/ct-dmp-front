<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      :qrCodeUrl="qrCodeUrl"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">隧道卡片</h2>
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
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName" :rules="[$validate.Required]">
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
            <th><span style="color: red;">*</span>隧道编号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>隧道名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>隧道分类</th>
            <td>
              <el-form-item label="" prop="classification">
                <el-input class="form-input" v-model="formData.classification" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>隧道桩号</th>
            <td>
              <el-form-item label="" prop="stake" :rules="[$validate.Required,$validate.PileToPile]">
                <el-input class="form-input" v-model="formData.stake" :readonly="readOnly"></el-input>
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
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>所属养护段</th>
            <td>
              <el-form-item label="" prop="sectionId">
                <el-input class="form-input" v-model="formData.sectionId" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桥梁左右幅</th>
            <td>
              <el-form-item label="" prop="bridgePainting">
                <el-input class="form-input" v-model="formData.bridgePainting" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>建成年限</th>
            <td>
              <el-form-item label="" prop="completionLife">
                <el-input class="form-input" v-model="formData.completionLife" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>原始桩号</th>
            <td>
              <el-form-item label="" prop="originalStake" :rules="[$validate.PileToPile]">
                <el-input class="form-input" v-model="formData.originalStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>纠正桩号</th>
            <td>
              <el-form-item label="" prop="correctStake" :rules="[$validate.PileToPile]">
                <el-input class="form-input" v-model="formData.correctStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
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
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th></th>
            <td></td>
          </tr>
        </table>
          </el-collapse-item>
          <el-collapse-item title="B.结构技术数据" name="2">
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
          <!-- B数据 -->
          <tr>
            <th>隧道结构形式</th>
            <td colspan="2">
              <el-form-item label="" prop="structureForm">
                <el-input class="form-input" v-model="formData.structureForm" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>横断面结构</th>
            <td>
              <el-form-item label="" prop="crossSectionalStructure" >
                <el-input class="form-input" v-model="formData.crossSectionalStructure" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>通风</th>
            <td>
              <el-form-item label="" prop="ventilate">
                <el-input class="form-input" v-model="formData.ventilate" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th rowspan="2">隧道洞长（m）</th>
            <th>上行洞长</th>
            <td>
              <el-form-item label="" prop="upwardHoleLength" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.upwardHoleLength" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>隧道净宽（m）</th>
            <td>
              <el-form-item label="" prop="openingWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.openingWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>行车道宽（m）</th>
            <td>
              <el-form-item label="" prop="drivewayWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.drivewayWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>下行洞长</th>
            <td>
              <el-form-item label="" prop="downHoleLength" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.downHoleLength" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路缘带（m）</th>
            <td>
              <el-form-item label="" prop="sideStrip" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.sideStrip" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>侧向余宽（m）</th>
            <td>
              <el-form-item label="" prop="lateralWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.lateralWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>检修道宽（m）</th>
            <td colspan="2">
              <el-form-item label="" prop="accessChannelWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.accessChannelWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>隧道净高（m）</th>
            <td>
              <el-form-item label="" prop="height" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.height" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>汽车横通道</th>
            <td>
              <el-form-item label="" prop="carCrossChannel">
                <el-input class="form-input" v-model="formData.carCrossChannel" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>上行洞纵坡</th>
            <td colspan="2">
              <el-form-item label="" prop="longitudinalUpstreamHole">
                <el-input class="form-input" v-model="formData.longitudinalUpstreamHole" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>下行洞纵坡</th>
            <td>
              <el-form-item label="" prop="longitudinalDownstreamHole">
                <el-input class="form-input" v-model="formData.longitudinalDownstreamHole" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>人行横通道</th>
            <td>
              <el-form-item label="" prop="pedestrianCrossChannel">
                <el-input class="form-input" v-model="formData.pedestrianCrossChannel" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th rowspan="2">衬砌结构</th>
            <th>明洞</th>
            <td>
              <el-form-item label="" prop="openCaveLiningStructure">
                <el-input class="form-input" v-model="formData.openCaveLiningStructure" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th rowspan="2">洞门形式</th>
            <th>上行端及其端墙材料</th>
            <td colspan="2">
              <el-form-item label="" prop="upstreamWallMaterial">
                <el-input class="form-input" v-model="formData.upstreamWallMaterial" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>暗洞</th>
            <td>
              <el-form-item label="" prop="darkCaveLiningStructure">
                <el-input class="form-input" v-model="formData.darkCaveLiningStructure" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>下行端及其端墙材料</th>
            <td colspan="2">
              <el-form-item label="" prop="downstreamWallMaterials">
                <el-input class="form-input" v-model="formData.downstreamWallMaterials" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th rowspan="3">衬砌</th>
            <th rowspan="3">SA表示:<br>暗挖区段<br><br>SMA表示:<br>明挖区段</th>
            <th>类型</th>
            <td colspan="4">
              <el-form-item label="" prop="liningType">
                <el-input class="form-input" v-model="formData.liningType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>厚度（m）</th>
            <td colspan="4">
              <el-form-item label="" prop="liningStick" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.liningStick" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>长度（m）</th>
            <td colspan="4">
              <el-form-item label="" prop="liningLength" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.liningLength" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th rowspan="2">洞内装饰</th>
            <th>侧墙饰面</th>
            <td>
              <el-form-item label="" prop="sideWallDecoration">
                <el-input class="form-input" v-model="formData.sideWallDecoration" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th rowspan="2">路面结构材料</th>
            <th>主线路面结构材料</th>
            <td colspan="2">
              <el-form-item label="" prop="mainRoadMaterial">
                <el-input class="form-input" v-model="formData.mainRoadMaterial" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>拱部内壁饰面</th>
            <td>
              <el-form-item label="" prop="innerWallDecoration">
                <el-input class="form-input" v-model="formData.innerWallDecoration" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>横通路面结构材料</th>
            <td colspan="2">
              <el-form-item label="" prop="crossRoadMaterial">
                <el-input class="form-input" v-model="formData.crossRoadMaterial" :readonly="readOnly"></el-input>
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
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>设计文件</th>
            <td>
              <el-form-item label="" prop="designFile">
                <form-component
                  v-model="formData.designFile"
                  type="select"
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>施工文件</th>
            <td>
              <el-form-item label="" prop="constructDocument">
                <form-component
                  v-model="formData.constructDocument"
                  type="select"
                  dictionaryCode="integrity"
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
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>验收文件</th>
            <td>
              <el-form-item label="" prop="acceptanceDocument">
                <form-component
                  v-model="formData.acceptanceDocument"
                  type="select"
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>行政文件</th>
            <td>
              <el-form-item label="" prop="administrativeDocument">
                <form-component
                  v-model="formData.administrativeDocument"
                  type="select"
                  dictionaryCode="integrity"
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
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>特殊检查报告</th>
            <td>
              <el-form-item label="" prop="specialCheckReport">
                <form-component
                  v-model="formData.specialCheckReport"
                  type="select"
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>历史维修资料</th>
            <td>
              <el-form-item label="" prop="maintainPreference">
                <form-component
                  v-model="formData.maintainPreference"
                  type="select"
                  dictionaryCode="integrity"
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
                  dictionaryCode="integrity"
                ></form-component>
              </el-form-item>
            </td>
            <th>建档年/月</th>
            <td>
              <el-form-item label="" prop="filingYear">
                <el-date-picker
                  v-model="formData.filingYear"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
        </table>
          </el-collapse-item>
          <el-collapse-item title="D:技术状况评定" name="4">
        <!-- D数据 -->
        <inline-edit-table
          title=""
          relatedTableCode="TunnelTech"
          :initDataInfo="listTunnelTech"
          @change="tunnelTechChange"
          :readonly="readOnly"
          :deleteUrl="$prifix.roadnetwork + '/rn/bd/tunnel/removeTunnelTech'"
        ></inline-edit-table>
          </el-collapse-item>
          <el-collapse-item title="E:修建记录" name="5">
        <!-- E数据 -->
        <inline-edit-table
          title=""
          relatedTableCode="TunnelRecord"
          :initDataInfo="listTunnelRecord"
          :readonly="readOnly"
          @change="tunnelRecordChange"
          :deleteUrl="$prifix.roadnetwork + '/rn/bd/tunnel/removeTunnelRecord'"
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
            <th>主管负责人</th>
            <td>
              <el-form-item label="" prop="mainPrincipal">
                <el-input class="form-input" v-model="formData.mainPrincipal" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>填卡人</th>
            <td>
              <el-form-item label="" prop="writeUserName">
                <el-input class="form-input" v-model="formData.writeUserName" :readonly="true"></el-input>
                <input v-model="formData.writeUserId" v-show="false">
              </el-form-item>
            </td>
            <th>填卡日期</th>
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
            <th>备注</th>
            <td colspan="5">
              <el-form-item label="" prop="memo">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入备注"
                  v-model="formData.memo">
                </el-input>
              </el-form-item>
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
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import childTable from '@/components/child-table';
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
import latLngPosition from '@/components/latLngPosition';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    childTable,
    inlineEditTable,
    uploader,
    formComponent,
    latLngPosition
  },
  data ()
  {
    return {
      style: {},
      activeNames: ['1', '2', '3', '4', '5'],
      metaData: {
        tunnelTech: [],
        tunnelRecord: []
      }
    };
  },
  methods: {
    /**
     * 涵洞技术状况评定子表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    tunnelTechChange (data)
    {
      this.metaData.tunnelTech = data;
    },
    /**
     * 涵洞修建记录子表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    tunnelRecordChange (data)
    {
      this.metaData.tunnelRecord = data;
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
            let tunnelTechString = JSON.stringify(this.metaData.tunnelTech);
            let tunnelRecordString = JSON.stringify(this.metaData.tunnelRecord);
            Object.assign(obj, this.formData, {tunnelTech: tunnelTechString, tunnelRecord: tunnelRecordString});
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_TUNNEL/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_TUNNEL/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_TUNNEL', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'listTunnelTech',
      'listTunnelRecord',
      'navigateMenus',
      'operateBtns',
      'qrCodeUrl'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
