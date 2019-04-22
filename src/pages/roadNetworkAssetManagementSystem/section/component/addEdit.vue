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
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <!-- 基本信息 -->
          <tr>
            <th class="form-header" colspan="4">
              <h2 style="text-align: center">基本信息</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>是否一幅高速</th>
            <td>
              <el-form-item label="" prop="ahighSpeed">
                <form-component
                  v-model="formData.ahighSpeed"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>区间路段名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>区间路段编号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="mgDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.mgDeptId"
                  :ztreeList="mgZtreeSelect"
                  @input="handleInput"
                ></ztree-select>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>养护单位</th>
            <td>
              <el-form-item label="" prop="mtDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.mtDeptId"
                  :ztreeList="mtZtreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>里程起点</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Required,$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>里程终点</th>
            <td>
              <el-form-item label="" prop="endStake" :rules="[$validate.Required,$validate.Pile]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>长度(km)</th>
            <td>
              <el-form-item label="" prop="length" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.length" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路面均宽(m)</th>
            <td>
              <el-form-item label="" prop="roadWide" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.roadWide" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>折算里程(m)</th>
            <td>
              <el-form-item label="" prop="discountedMileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.discountedMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>匝道连接线里程(m)</th>
            <td>
              <el-form-item label="" prop="rampMileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.rampMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>车道类型</th>
            <td>
              <el-form-item label="" prop="driveType">
                <el-input class="form-input" v-model="formData.driveType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路面类型</th>
            <td>
              <el-form-item label="" prop="roadType">
                <el-input class="form-input" v-model="formData.roadType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>路基宽度</th>
            <td>
              <el-form-item label="" prop="subgradeWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.subgradeWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>设计时速</th>
            <td>
              <el-form-item label="" prop="designSpeed" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.designSpeed" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>修建年度</th>
            <td>
              <el-form-item label="" prop="constructYear">
                <el-date-picker
                  v-model="formData.constructYear"
                  value-format="yyyy-MM-dd"
                  type="date" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>改建年度</th>
            <td>
              <el-form-item label="" prop="reconstructYear">
                <el-date-picker
                  v-model="formData.reconstructYear"
                  value-format="yyyy-MM-dd"
                  type="date" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>最近一次大中修年度</th>
            <td>
              <el-form-item label="" prop="lastMajorRepairYear">
                <el-date-picker
                  v-model="formData.lastMajorRepairYear"
                  value-format="yyyy-MM-dd"
                  :readonly="readOnly"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
            <th>地貌类型</th>
            <td>
              <el-form-item label="" prop="landformType">
                <el-input class="form-input" v-model="formData.landformType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>技术等级</th>
            <td>
              <el-form-item label="" prop="techGrade">
                <el-input class="form-input" v-model="formData.techGrade" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>政区编码</th>
            <td>
              <el-form-item label="" prop="regionCode">
                <el-input class="form-input" v-model="formData.regionCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
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
            <th></th>
            <td>
            </td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="3">
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
            <td colspan="3" height="190" class="upload-td">
              <uploader v-model="formData.sessionId">
              </uploader>
            </td>
          </tr>
        </table>
        <!-- 重复路段 -->
        <child-table
          title="重复路段"
          relatedTableCode="RepeatSection"
          :initDataInfo="listRepeatSection"
          @change="repeatSectionChange"
          :deleteUrl="$prifix.roadnetwork + '/rn/bd/section/removeRepeatSection'"
        ></child-table>
        <!-- 外单位养护路段 -->
        <child-table
          title="外单位养护路段"
          relatedTableCode="ExternalSection"
          :initDataInfo="listExternalSection"
          @change="externalSectionChange"
          :deleteUrl="$prifix.roadnetwork + '/rn/bd/section/removeExternalSection'"
        ></child-table>
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
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    childTable,
    uploader,
    formComponent
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        repeatSection: [],
        externalSection: []
      }
    };
  },
  methods: {
    handleInput (hiddenValue)
    {
    },
    /**
     * 涵洞技术状况评定子表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    repeatSectionChange (data)
    {
      this.metaData.repeatSection = data;
    },
    /**
     * 涵洞修建记录子表数据赋值
     * @author   liangyi
     * @date     2018/12/5
     */
    externalSectionChange (data)
    {
      this.metaData.externalSection = data;
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
            let repeatSectionString = JSON.stringify(this.metaData.repeatSection);
            let externalSectionString = JSON.stringify(this.metaData.externalSection);
            Object.assign(obj, this.formData, {repeatSection: repeatSectionString, externalSection: externalSectionString});
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_SECTION/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_SECTION/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_SECTION', [
      'readOnly',
      'formData',
      'deptId',
      'mgZtreeSelect',
      'mtZtreeSelect',
      'listRepeatSection',
      'listExternalSection',
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
