<template>
  <div class="form-container" @mousewheel.stop>
    <el-tabs tab-position="bottom" v-model="activeIndex" type="card">
      <el-tab-pane label="交通量观测站" name="administration">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="20%"/>
              <col width="30%"/>
              <col width="20%"/>
              <col width="30%"/>
            </colgroup>
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
              <th>管理单位</th>
              <td>
                {{managementUnit}}
              </td>
              <th>所属区间段编号</th>
              <td>
                {{formData.sectionCode}}
              </td>
            </tr>
            <tr>
              <th>调查站编号</th>
              <td>
                {{formData.observatoryNumber}}
              </td>
              <th>调查站名称</th>
              <td>
                {{formData.name}}
              </td>
            </tr>
            <tr>
              <th>调查站类型</th>
              <td>
                {{formData.observatoryType}}
              </td>
              <th>建站时间</th>
              <td>
                {{formData.createTime}}
              </td>
            </tr>
            <tr>
              <th>调查方法</th>
              <td>
                {{formData.surveyMethod}}
              </td>
              <th>桩号</th>
              <td>
                {{formData.stake}}
              </td>
            </tr>
            <tr>
              <th>路段起始桩号</th>
              <td>
                {{formData.startStake}}
              </td>
              <th>路段起始桩号</th>
              <td>
                {{formData.endStake}}
              </td>
            </tr>
            <tr>
              <th>起点名称</th>
              <td>
                {{formData.startName}}
              </td>
              <th>终点名称</th>
              <td>
                {{formData.endName}}
              </td>
            </tr>
            <tr>
              <th>上行名称</th>
              <td>
                {{formData.upName}}
              </td>
              <th>下行名称</th>
              <td>
                {{formData.downName}}
              </td>
            </tr>
            <tr>
              <th>代表里程(km)</th>
              <td>
                {{formData.representMileage}}
              </td>
              <th>技术等级</th>
              <td>
                {{formData.techGrade}}
              </td>
            </tr>
            <tr>
              <th>技术等级唯一</th>
              <td>
                {{formData.techGradeUnique}}
              </td>
              <th>车道特征</th>
              <td>
                {{formData.laneFeature}}
              </td>
            </tr>
            <tr>
              <th>路面类型</th>
              <td>
                {{formData.roadType}}
              </td>
              <th>路面宽度</th>
              <td>
                {{formData.roadWidth}}
              </td>
            </tr>
            <tr>
              <th>设计时速(km/h)</th>
              <td>
                {{formData.designSpeed}}
              </td>
              <th>地貌</th>
              <td>
                {{formData.landformType}}
              </td>
            </tr>
            <tr>
              <th>适应交通量</th>
              <td>
                {{formData.applicableTraffic}}
              </td>
              <th>供电方式</th>
              <td>
                {{formData.powerSupply}}
              </td>
            </tr>
            <tr>
              <th>通讯方式</th>
              <td>
                {{formData.communicationMode}}
              </td>
              <th>公路功能</th>
              <td>
                {{formData.roadFunction}}
              </td>
            </tr>
            <tr>
              <th>调查站状态</th>
              <td>
                {{formData.observatoryState}}
              </td>
              <th>比重代表里程</th>
              <td>
                {{formData.proportionRepresentMileage}}
              </td>
            </tr>
            <tr>
              <th>比重起点桩号</th>
              <td>
                {{formData.proportionStartStake}}
              </td>
              <th>比重终点桩号</th>
              <td>
                {{formData.proportionEndStake}}
              </td>
            </tr>
            <tr>
              <th>年份</th>
              <td>
                {{formData.year}}
              </td>
              <th>行政区划</th>
              <td>
                {{formData.administrativeDivision}}
              </td>
            </tr>
            <tr>
              <th>停测月份</th>
              <td>
                {{formData.testMonth}}
              </td>
              <th>出临行政区域</th>
              <td>
                {{formData.outAdministrativeDivision}}
              </td>
            </tr>
            <tr>
              <th>一级里程</th>
              <td>
                {{formData.firstMileage}}
              </td>
              <th>二级里程</th>
              <td>
                {{formData.secondMileage}}
              </td>
            </tr>
            <tr>
              <th>三级里程</th>
              <td>
                {{formData.thirdMileage}}
              </td>
              <th>四级里程</th>
              <td>
                {{formData.fourMileage}}
              </td>
            </tr>
            <tr>
              <th>高速里程</th>
              <td>
                {{formData.highMileage}}
              </td>
              <th>等外里程</th>
              <td>
                {{formData.suchMileage}}
              </td>
            </tr>
            <tr>
              <th>经纬度</th>
              <td>
                {{formData.coordinate}}
              </td>
              <th>调查人员数量</th>
              <td>
                {{formData.investigatorsNum}}
              </td>
            </tr>
            <tr>
              <th>是否移交</th>
              <td>
                {{formData.isHandOver}}
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
import { getBridgeView } from '@/api/common/common';
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
      picture: '', // 照
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
      this.managementUnit = this.formData.belongDeptId;
      console.log(this.managementUnit);
    },
    /**
     * 获取图片
     * @author   chenguang
     * @date     2019/1/23
     */
    getBridgeViewImage ()
    {
      getBridgeView(this.formData.picture).then(({ data }) =>
      {
        this.picture = `data:image/jpg;base64,${data.data}`;
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
