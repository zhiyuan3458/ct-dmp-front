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
              <th>隧道编号</th>
              <td>
                {{formData.code}}
              </td>
            </tr>
            <tr>
              <th>隧道名称</th>
              <td>
                {{formData.name}}
              </td>
              <th>起点桩号</th>
              <td>
                {{formData.startStake}}
              </td>
            </tr>
            <tr>
              <th>隧道分类</th>
              <td>
                {{formData.classification}}
              </td>
              <th>隧道桩号</th>
              <td>
                {{formData.stake}}
              </td>
            </tr>
            <tr>
              <th>终点桩号</th>
              <td>
                {{formData.endStake}}
              </td>
              <th>管理单位</th>
              <td>
                {{managementUnit}}
              </td>
            </tr>
            <tr>
              <th>所属养护段</th>
              <td>
                {{formData.sectionId}}
              </td>
              <th>桥梁左右幅</th>
              <td>
                {{formData.bridgePainting}}
              </td>
            </tr>
            <tr>
              <th>建成年限</th>
              <td>
                {{formData.completionLife}}
              </td>
              <th>原始桩号</th>
              <td>
                {{formData.originalStake}}
              </td>
            </tr>
            <tr>
              <th>纠正桩号</th>
              <td>
                {{formData.correctStake}}
              </td>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
            </tr>
            <tr>
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
              <th></th>
              <td></td>
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
              <th>隧道结构形式</th>
              <td>
                {{formData.structureForm}}
              </td>
              <th>横断面结构</th>
              <td>
                {{formData.crossSectionalStructure}}
              </td>
            </tr>
            <tr>
              <th>通风</th>
              <td>
                {{formData.ventilate}}
              </td>
              <th>上行洞长</th>
              <td>
                {{formData.upwardHoleLength}}
              </td>
            </tr>
            <tr>
              <th>隧道净宽（m）</th>
              <td>
                {{formData.openingWidth}}
              </td>
              <th>行车道宽（m）</th>
              <td>
                {{formData.drivewayWidth}}
              </td>
            </tr>
            <tr>
              <th>下行洞长</th>
              <td>
                {{formData.downHoleLength}}
              </td>
              <th>路缘带（m）</th>
              <td>
                {{formData.sideStrip}}
              </td>
            </tr>
            <tr>
              <th>侧向余宽（m）</th>
              <td>
                {{formData.lateralWidth}}
              </td>
              <th>检修道宽（m）</th>
              <td>
                {{formData.accessChannelWidth}}
              </td>
            </tr>
            <tr>
            <th>隧道净高（m）</th>
            <td>
              {{formData.height}}
            </td>
            <th>汽车横通道</th>
            <td>
              {{formData.carCrossChannel}}
            </td>
          </tr>
          <tr>
            <th>上行洞纵坡</th>
            <td>
             {{formData.longitudinalUpstreamHole}}
            </td>
            <th>下行洞纵坡</th>
            <td>
              {{formData.longitudinalDownstreamHole}}
            </td>
          </tr>
            <tr>
              <th>人行横通道</th>
              <td>
                {{formData.pedestrianCrossChannel}}
              </td>
              <th>衬砌结构--明洞</th>
              <td>
                {{formData.openCaveLiningStructure}}
              </td>
            </tr>
          <tr>
            <th>洞门形式--上行端及其端墙材料</th>
            <td>
              {{formData.upstreamWallMaterial}}
            </td>
            <th>衬砌结构--暗洞</th>
            <td>
              {{formData.darkCaveLiningStructure}}
            </td>
          </tr>
            <tr>
              <th>洞门形式--下行端及其端墙材料</th>
              <td>
                {{formData.downstreamWallMaterials}}
              </td>
              <th>衬砌类型</th>
              <td>
                {{formData.liningType}}
              </td>
            </tr>
            <tr>
              <th>衬砌厚度（m）</th>
              <td>
                {{formData.liningStick}}
              </td>
              <th>衬砌长度（m）</th>
              <td>
                {{formData.liningType}}
              </td>
            </tr>
            <tr>
              <th>洞内装饰--侧墙饰面</th>
              <td>
                {{formData.sideWallDecoration}}
              </td>
              <th>洞内装饰--拱部内壁饰面</th>
              <td>
                {{formData.innerWallDecoration}}
              </td>
            </tr>
            <tr>
              <th>路面结构材料--主线路面结构材料</th>
              <td>
                {{formData.mainRoadMaterial}}
              </td>
              <th>路面结构材料--横通路面结构材料</th>
              <td>
                {{formData.crossRoadMaterial}}
              </td>
            </tr>
            <tr>
              <th>衬砌厚度（m）</th>
              <td>
                {{formData.liningStick}}
              </td>
              <th>衬砌长度（m）</th>
              <td>
                {{formData.liningLength}}
              </td>
            </tr>
          </table>
        </el-tab-pane>
      <el-tab-pane label="C.档案资料" name="file">
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
        console.log('bridgeinfo=' + newValue);
        if (newValue)
        {
          this.formData = JSON.parse(newValue);
          this.getManagementUnit();
          // this.getBridgeViewImage();
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
