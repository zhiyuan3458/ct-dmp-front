<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="A.行政识别数据" name="administration">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <!-- A数据 -->
            <tr>
              <td colspan="2" style="text-align:center;">
                 立面照
                <img :src="verticalView" style="width:150px;height:100px;">
              </td>
              <td colspan="2" style="text-align:center;">
                正面照
                <img :src="frontalView" style="width:150px;height:100px;">
              </td>
            </tr>
            <tr>
              <th>路线编号</th>
              <td>
                {{formData.routeCode}}
              </td>
              <th>路线名称</th>
              <td>
                {{formData.routeName}}
              </td>
            </tr>
            <tr>
              <th>路线等级</th>
              <td>
               {{formData.routeGrade}}
              </td>
              <th>桥梁编号</th>
              <td>
                {{formData.code}}
              </td>
            </tr>
            <tr>
              <th>桥梁名称</th>
              <td>
                {{formData.name}}
              </td>
              <th>桥梁规模类型</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.scaleType"
                    type="select"
                    dictionaryCode="bridgeType"
                  ></form-component>
              </td>
            </tr>
            <tr>
              <th>构造类型</th>
              <td>
                {{formData.structureType}}
              </td>
              <th>管理单位</th>
              <td>
                  {{managementUnit}}
              </td>
            </tr>
            <tr>
              <th>原始桩号</th>
              <td>
                {{formData.originalStake}}
              </td>
              <th>纠正桩号</th>
              <td>
                {{formData.correctStake}}
              </td>
            </tr>
            <tr>
              <th>起始桩号</th>
              <td>
                {{formData.startStake}}
              </td>
              <th>终点桩号</th>
              <td>
                {{formData.endStake}}
              </td>
            </tr>
            <tr>
              <th>桥位中心桩号</th>
              <td>
                {{formData.pileId}}
              </td>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
            </tr>
            <tr>
              <th>桥梁左右幅</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.bridgePainting"
                    type="select"
                    dictionaryCode="bridgePainting"
                  ></form-component>
              </td>
              <th>桥面铺装</th>
              <td>
                {{formData.deck}}
              </td>
            </tr>
            <tr>
              <th>弯斜坡度</th>
              <td>
                {{formData.curveSlope}}
              </td>
              <th>功能类型</th>
              <td>
                {{formData.functionType}}
              </td>
            </tr>
            <tr>
              <th>下穿通道名</th>
              <td>
                {{formData.beneathChannelName}}
              </td>
              <th>下穿通道桩号</th>
              <td>
                {{formData.beneathChannelStake}}
              </td>
            </tr>
            <tr>
              <th>设计荷载</th>
              <td>
                {{formData.designLoad}}
              </td>
              <th>通行载重</th>
              <td>
                {{formData.trafficLoad}}
              </td>
            </tr>
            <tr>
              <th>建成年月/设计使用年限</th>
              <td>
                {{formData.completionLife}}
              </td>
              <th>是否移交</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.isHandOver"
                    type="select"
                    dictionaryCode="yesNo"
                  ></form-component>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      <el-tab-pane label="B.结构技术数据" name="structure">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <!-- B数据 -->
            <tr>
              <th>桥长（m）</th>
              <td>
                {{formData.length}}
              </td>
              <th>桥面总宽（m）</th>
              <td>
                {{formData.deckWidth}}
              </td>
            </tr>
            <tr>
              <th>车行道宽（m）</th>
              <td>
                {{formData.roadwayWidth}}
              </td>
              <th>桥面标高（m）</th>
              <td>
                {{formData.deckElevation}}
              </td>
            </tr>
            <tr>
              <th>桥下净高（m）</th>
              <td>
                {{formData.subHeight}}
              </td>
              <th>桥上净高（m）</th>
              <td>
                {{formData.upperHeight}}
              </td>
            </tr>
            <tr>
              <th>引道总宽（m）</th>
              <td>
                {{formData.approachWidth}}
              </td>
              <th>引道路面宽（m）</th>
              <td>
                {{formData.citedWidth}}
              </td>
            </tr>
            <tr>
              <th>引道线形</th>
              <td>
                {{formData.linearApproach}}
              </td>
              <th>伸缩缝类型</th>
              <td>
                {{formData.expansionType}}
              </td>
            </tr>
            <tr>
            <th>支座形式</th>
            <td>
              {{formData.supportForm}}
            </td>
            <th>地震动峰值加速度系数</th>
            <td>
              {{formData.peakCoefficient}}
            </td>
          </tr>
          <tr>
            <th>桥台护坡</th>
            <td>
             {{formData.abutment}}
            </td>
            <th>护墩体</th>
            <td>
              {{formData.spier}}
            </td>
          </tr>
            <tr>
              <th>调治构造物</th>
              <td>
                {{formData.modulate}}
              </td>
              <th>常水位</th>
              <td>
                {{formData.normalLevel}}
              </td>
            </tr>
          <tr>
            <th>设计水位</th>
            <td>
              {{formData.designLevel}}
            </td>
            <th>历史洪水位</th>
            <td>
              {{formData.historicalFloodLevel}}
            </td>
          </tr>
          </table>
        </el-tab-pane>
      <el-tab-pane label="c.档案资料" name="file">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
            <!-- C数据 -->
            <tr>
              <th>设计图纸</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.designDrawing"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
              <th>设计文件</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.designFile"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
            </tr>
            <tr>
              <th>施工文件</th>
              <td>
                <form-component
                  readOnly
                  class="form-component-container"
                  v-model="formData.constructDocument"
                  type="select"
                  dictionaryCode="referenceType"
                ></form-component>
              </td>
              <th>竣工图纸</th>
              <td>
                <form-component
                  readOnly
                  class="form-component-container"
                  v-model="formData.finBuiltDrawing"
                  type="select"
                  dictionaryCode="referenceType"
                ></form-component>
              </td>
            </tr>
            <tr>
              <th>验收文件</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.acceptanceDocument"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
              <th>行政文件</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.administrativeDocument"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
            </tr>
            <tr>
              <th>定期检查报告</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.regularCheckReport"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
              <th>特殊检查报告</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.specialCheckReport"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
            </tr>
            <tr>
              <th>历史维修资料</th>
              <td>
                <form-component
                  readOnly
                  class="form-component-container"
                  v-model="formData.maintainPreference"
                  type="select"
                  dictionaryCode="referenceType"
                ></form-component>
              </td>
              <th>档案号</th>
              <td>
                {{formData.recordNo}}
              </td>
            </tr>
            <tr>
              <th>存档案</th>
              <td>
                  <form-component
                    readOnly
                    class="form-component-container"
                    v-model="formData.registerFile"
                    type="select"
                    dictionaryCode="referenceType"
                  ></form-component>
              </td>
              <th>建档年/月</th>
              <td>
                  {{formData.filingYear}}
              </td>
            </tr>
          </table>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import ztreeSelect from '@/components/ztreeSelect';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { getDepts, getBridgeView } from '@/api/common/common';
export default {
  components: {
    ztreeSelect,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      activeIndex: 'administration', // tab标签默认初始页
      verticalView: '', // 立面照
      frontalView: '', // 正面照
      readOnly: true,
      formData: {},
      managementUnit: '' // 管理单位
    };
  },
  props: {
    bridgeInfo: {
      type: String,
      required: false,
      default ()
      {
        return '';
      }
    }
  },
  watch: {
    bridgeInfo:
    {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.formData = JSON.parse(newValue);
          this.getManagementUnit();
          this.getBridgeViewImage();
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 获取管理单位
     * @author   chenguang
     * @date     2018/12/27
     */
    getManagementUnit ()
    {
      console.log('this.formData');
      getDepts(this.formData.belongDeptId).then(({ data }) =>
      {
        let listDept = data.data;
        this.managementUnit = listDept.map(dept => dept.name).join(',');
      });
    },
    /**
     * 获取图片
     * @author   chenguang
     * @date     2019/1/23
     */
    getBridgeViewImage ()
    {
      getBridgeView(this.formData.verticalView).then(({ data }) =>
      {
        this.verticalView = `data:image/jpg;base64,${data.data}`;
      });
      getBridgeView(this.formData.frontalView).then(({ data }) =>
      {
        this.frontalView = `data:image/jpg;base64,${data.data}`;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form-container {
  width: 100%;
  height: 400px;
  /deep/ .el-tabs__content {
    height: 350px;
    overflow: auto;
  }
  .form-table {
    th {
      font-weight: 100;
    }
  }
  /deep/ .el-select {
    width: 100%!important;
  }
}
</style>
