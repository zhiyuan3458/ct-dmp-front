<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      :qrCodeUrl="qrCodeUrl"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" :rules="metaData.rules" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[{ required: true, message: '请填写', trigger: 'change' }]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName" :rules="[{ required: true, message: '请填写', trigger: 'change' }]">
                <el-input class="form-input" v-model="formData.routeName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>所属区间段编号</th>
            <td>
              <el-form-item label="" prop="sectionCode">
                <el-input class="form-input" v-model="formData.sectionCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>调查站编号</th>
            <td>
              <el-form-item label="" prop="observatoryNumber">
                <el-input class="form-input" v-model="formData.observatoryNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查站名称</th>
            <td>
              <el-form-item label="" prop="name">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>调查站类型</th>
            <td>
              <el-form-item label="" prop="observatoryType">
                <el-input class="form-input" v-model="formData.observatoryType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>建站时间</th>
            <td>
              <el-form-item label="" prop="createTime">
                <el-input class="form-input" v-model="formData.createTime" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>调查方法</th>
            <td>
              <el-form-item label="" prop="surveyMethod">
                <el-input class="form-input" v-model="formData.surveyMethod" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桩号</th>
            <td>
              <el-form-item label="" prop="stake"
                            :rules="[ { required: false, message: '请填写', trigger: 'change' }, {validator: $validate.validatePile, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.stake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>路段起始桩号</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[
                { required: false, message: '请填写', trigger: 'change' },
                {validator: $validate.validatePile, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路段起始桩号</th>
            <td>
              <el-form-item label="" prop="endStake" :rules="[
                { required: false, message: '请填写', trigger: 'change' },
                {validator: $validate.validatePile, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起点名称</th>
            <td>
              <el-form-item label="" prop="startName">
                <el-input class="form-input" v-model="formData.startName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>终点名称</th>
            <td>
              <el-form-item label="" prop="endName">
                <el-input class="form-input" v-model="formData.endName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>上行名称</th>
            <td>
              <el-form-item label="" prop="upName">
                <el-input class="form-input" v-model="formData.upName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>下行名称</th>
            <td>
              <el-form-item label="" prop="downName">
                <el-input class="form-input" v-model="formData.downName" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>代表里程(km)</th>
            <td>
              <el-form-item label="" prop="representMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.representMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>技术等级</th>
            <td>
              <el-form-item label="" prop="techGrade">
                <form-component
                  v-model="formData.techGrade"
                  type="select"
                  dictionaryCode="rqiGrade"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>技术等级唯一</th>
            <td>
              <el-form-item label="" prop="techGradeUnique">
                <form-component
                  v-model="formData.techGradeUnique"
                  type="select"
                  dictionaryCode="trueFalse"
                ></form-component>
              </el-form-item>
            </td>
            <th>车道特征</th>
            <td>
              <el-form-item label="" prop="laneFeature">
                <form-component
                  v-model="formData.laneFeature"
                  type="select"
                  dictionaryCode="车道类型"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>路面类型</th>
            <td>
              <el-form-item label="" prop="roadType">
                <el-input class="form-input" v-model="formData.roadType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路面宽度</th>
            <td>
              <el-form-item label="" prop="roadWidth" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.roadWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>设计时速(km/h)</th>
            <td>
              <el-form-item label="" prop="designSpeed" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.designSpeed" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>地貌</th>
            <td>
              <el-form-item label="" prop="landformType">
                <el-input class="form-input" v-model="formData.landformType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>适应交通量</th>
            <td>
              <el-form-item label="" prop="applicableTraffic">
                <el-input class="form-input" v-model="formData.applicableTraffic" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>供电方式</th>
            <td>
              <el-form-item label="" prop="powerSupply">
                <el-input class="form-input" v-model="formData.powerSupply" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>通讯方式</th>
            <td>
              <el-form-item label="" prop="communicationMode">
                <el-input class="form-input" v-model="formData.communicationMode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>公路功能</th>
            <td>
              <el-form-item label="" prop="roadFunction">
                <el-input class="form-input" v-model="formData.roadFunction" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>调查站状态</th>
            <td>
              <el-form-item label="" prop="observatoryState">
                <el-input class="form-input" v-model="formData.observatoryState" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>比重代表里程</th>
            <td>
              <el-form-item label="" prop="proportionRepresentMileage">
                <el-input class="form-input" v-model="formData.proportionRepresentMileage"
                          :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>比重起点桩号</th>
            <td>
              <el-form-item label="" prop="proportionStartStake">
                <el-input class="form-input" v-model="formData.proportionStartStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>比重终点桩号</th>
            <td>
              <el-form-item label="" prop="proportionEndStake">
                <el-input class="form-input" v-model="formData.proportionEndStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>年份</th>
            <td>
              <el-form-item label="" prop="year">
                <el-date-picker
                  v-model="formData.year"
                  type="date"
                  placeholder="选择日期" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>行政区划</th>
            <td>
              <el-form-item label="" prop="administrativeDivision">
                <el-input class="form-input" v-model="formData.administrativeDivision" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>停测月份</th>
            <td>
              <el-form-item label="" prop="testMonth">
                <el-date-picker
                  v-model="formData.testMonth"
                  type="date"
                  placeholder="选择日期" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>出临行政区域</th>
            <td>
              <el-form-item label="" prop="outAdministrativeDivision">
                <el-input class="form-input" v-model="formData.outAdministrativeDivision"
                          :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>一级里程</th>
            <td>
              <el-form-item label="" prop="firstMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.firstMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>二级里程</th>
            <td>
              <el-form-item label="" prop="secondMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.secondMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>三级里程</th>
            <td>
              <el-form-item label="" prop="thirdMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.thirdMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>四级里程</th>
            <td>
              <el-form-item label="" prop="fourMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.fourMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>高速里程</th>
            <td>
              <el-form-item label="" prop="highMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.highMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>等外里程</th>
            <td>
              <el-form-item label="" prop="suchMileage" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.suchMileage" :readonly="readOnly"></el-input>
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
            <th></th>
            <td>
            </td>
          </tr>
          <tr>
            <th>调查人员数量</th>
            <td>
              <el-form-item label="" prop="investigatorsNum" :rules="[
                  {validator: $validate.validateNumber, trigger: 'blur'}]">
                <el-input class="form-input" v-model="formData.investigatorsNum" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>是否移交</th>
            <td>
              <el-form-item label="" prop="isHandOver">
                <el-input class="form-input" v-model="formData.isHandOver" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附注:</th>
            <td colspan="5">
              <el-form-item label="" prop="memo">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formData.memo">
                </el-input>
              </el-form-item>
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
import childTable from '@/components/child-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import {mapGetters} from 'vuex';
import latLngPosition from '@/components/latLngPosition';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader,
    childTable,
    formComponent,
    latLngPosition
  },
  data ()
  {
    return {
      tt: '',
      style: {},
      metaData: {}
    };
  },
  methods: {
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
            Object.assign(obj, this.formData);
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_OBSERVATORY/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_OBSERVATORY', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'isAddEditShow',
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
