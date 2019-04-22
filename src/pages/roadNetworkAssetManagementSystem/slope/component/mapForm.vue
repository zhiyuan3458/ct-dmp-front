<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="边坡路堤挡墙信息" name="administration">
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
              <th>结构编号</th>
              <td>
                {{formData.code}}
              </td>
            </tr>
            <tr>
              <th>起点桩号</th>
              <td>
                {{formData.startStake}}
              </td>
              <th>终点桩号</th>
              <td>
                {{formData.endStake}}
              </td>
            </tr>
            <tr>
              <th>方向</th>
              <td>
                {{formData.direction}}
              </td>
              <th>抗震等级</th>
              <td>
                {{formData.antiGrade}}
              </td>
            </tr>
            <tr>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
              <th>地质情况</th>
              <td>
                {{formData.geologyCase}}
              </td>
            </tr>
            <tr>
              <th>设计单位</th>
              <td>
                {{formData.designUnit}}
              </td>
              <th>施工单位</th>
              <td>
                {{formData.constructionUnit}}
              </td>
            </tr>
            <tr>
              <th>竣工日期</th>
              <td>
                {{formData.completionDate}}
              </td>
              <th>有无检测点</th>
              <td>
                {{formData.checkPoint}}
              </td>
            </tr>
            <tr>
              <th>有无检修通道</th>
              <td>
                {{formData.serviceChannel}}
              </td>
              <th>管理单位</th>
              <td>
                {{managementUnit}}
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
              <th>检查记录</th>
              <td>
                {{formData.inspectionRecord}}
              </td>
            </tr>
            <tr>
              <th>监测记录</th>
              <td>
                {{formData.detectionRecord}}
              </td>
              <th>维修加固记录</th>
              <td>
                {{formData.serviceRecord}}
              </td>
            </tr>
            <tr>
              <th>备注</th>
              <td>
                {{formData.memo}}
              </td>
              <th></th>
              <td>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      <el-tab-pane label="边坡信息" name="file">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <tr>
            <td colspan="2" style="text-align:center;">
              边坡正面照
              <img :src="sideView" style="width:150px;height:100px;">
            </td>
          </tr>
          <tr>
            <th>护面形式</th>
            <td>
              {{formData.protectionType}}
            </td>
            <th>高度(米)</th>
            <td>
              {{formData.height}}
            </td>
          </tr>
          <tr>
            <th>位置</th>
            <td>
              {{formData.position}}
            </td>
            <th>平均坡度</th>
            <td>
              {{formData.averagePitch}}
            </td>
          </tr>
          <tr>
            <th>坡级--数目</th>
            <td>
              {{formData.num}}
            </td>
            <th>坡级--防护坡率（分级注明）</th>
            <td>
              {{formData.entrenchRate}}
            </td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="挡土墙信息" name="structure">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <tr>
            <td colspan="2" style="text-align:center;">
              挡土墙正面照
              <img :src="wallView" style="width:150px;height:100px;">
            </td>
          </tr>
          <tr>
            <th>结构形式</th>
            <td>
              {{formData.structureForm}}
            </td>
            <th>位置</th>
            <td>
              {{formData.positions}}
            </td>
          </tr>
          <tr>
            <th>高度(米)</th>
            <td>
              {{formData.heights}}
            </td>
            <th>泄水孔--大小（毫米）</th>
            <td>
              {{formData.bigOrSmall}}
            </td>
          </tr>
          <tr>
            <th>泄水孔--间距（米）</th>
            <td>
              {{formData.spacing}}
            </td>
            <th></th>
            <td>
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
      sideView: '', // 边坡正面照
      wallView: '', // 挡土墙正面照
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
      }
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
      getBridgeView(this.formData.sideView).then(({ data }) =>
      {
        this.sideView = `data:image/jpg;base64,${data.data}`;
      });
      getBridgeView(this.formData.wallView).then(({ data }) =>
      {
        this.wallView = `data:image/jpg;base64,${data.data}`;
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
