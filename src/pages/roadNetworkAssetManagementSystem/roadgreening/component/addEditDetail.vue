<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
      :qrCodeUrl="qrCodeUrl"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <input v-model="formData.belongDeptId" v-show="false">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">公路绿化基本信息</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>序号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起讫桩号</th>
            <td>
              <el-form-item label="" prop="stake" :rules="[$validate.PileToPile]">
                <el-input class="form-input" v-model="formData.stake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>公路总里程(km)</th>
            <td>
              <el-form-item label="" prop="mileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.mileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>可绿化里程(M2)</th>
            <td>
              <el-form-item label="" prop="greenMileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.greenMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
          <tr>
            <th>已绿化里程(km)</th>
            <td>
              <el-form-item label="" prop="beGreenedMileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.beGreenedMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>绿化率</th>
            <td>
              <el-form-item label="" prop="greenRatio" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.greenRatio" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <inline-edit-table
          title="当年绿化情况"
          relatedTableCode="RoadGreeningSub"
          :initDataInfo="listRoadGreeningSub"
          @change="roadGreeningSubChange"
          :deleteUrl="$prifix.roadnetwork + '/sys/roadgreening/removeRoadGreeningSub'"
        ></inline-edit-table>
        <inline-edit-table
          title="绿化详细情况"
          relatedTableCode="RoadGreeningDetail"
          :initDataInfo="listRoadGreeningDetail"
          @change="roadGreeningDetailChange"
          :deleteUrl="$prifix.roadnetwork + '/sys/roadgreening/removeRoadGreeningDetail'"
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
            <th>是否移交</th>
            <td>
              <el-form-item label="" prop="isHandOver">
                <form-component
                  v-model="formData.isHandOver"
                  type="select"
                  dictionaryCode="yesNo"
                  :readOnly="readOnly"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>附件</th>
            <td colspan="5" height="190" class="upload-td">
              <uploader v-model="formData.sessionId" :readonly="readOnly">
              </uploader>
            </td>
          </tr>
          <tr>
            <th>制表</th>
            <td>
              <el-form-item label="" prop="tabPerson">
                <el-input class="form-input" v-model="formData.tabPerson" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>复核</th>
            <td>
              <el-form-item label="" prop="checkPerson">
                <el-input class="form-input" v-model="formData.checkPerson" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>制表日期</th>
            <td>
              <el-form-item label="" prop="tabTime">
                <el-date-picker
                  v-model="formData.tabTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :readonly="readOnly">
                </el-date-picker>
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
import inlineEditTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
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
        roadGreeningSub: [],
        roadGreeningDetail: []
      }
    };
  },
  methods: {
    /**
     * 公路绿化子表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    roadGreeningSubChange (data)
    {
      this.metaData.roadGreeningSub = data;
    },
    /**
     * 公路绿化详细表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    roadGreeningDetailChange (data)
    {
      this.metaData.roadGreeningDetail = data;
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
            let roadGreeningSubString = JSON.stringify(this.metaData.roadGreeningSub);
            let roadGreeningDetailString = JSON.stringify(this.metaData.roadGreeningDetail);
            Object.assign(obj, this.formData, {roadGreeningSub: roadGreeningSubString, roadGreeningDetail: roadGreeningDetailString});
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADGREENING/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADGREENING/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADGREENING', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'listRoadGreeningSub',
      'listRoadGreeningDetail',
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
