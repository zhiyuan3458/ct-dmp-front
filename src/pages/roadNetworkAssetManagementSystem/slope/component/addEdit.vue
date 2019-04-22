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
            <col width="17%"/>
            <col width="16%"/>
            <col width="17%"/>
            <col width="16%"/>
            <col width="17%"/>
            <col width="16%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">边坡路堤挡墙卡片</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td colspan="2">
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>结构编号</th>
            <td colspan="2">
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>起点桩号</th>
            <td colspan="2">
              <el-form-item label="" prop="startStake" :rules="[$validate.Required,$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>终点桩号</th>
            <td colspan="2">
              <el-form-item label="" prop="endStake" :rules="[$validate.Required,$validate.Pile]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>方向</th>
            <td colspan="2">
              <el-form-item label="" prop="direction" >
                <form-component
                  v-model="formData.direction"
                  type="select"
                  dictionaryCode="direction"
                ></form-component>
              </el-form-item>
            </td>
            <th>抗震等级</th>
            <td colspan="2">
              <el-form-item label="" prop="antiGrade" >
                <form-component
                  v-model="formData.antiGrade"
                  type="select"
                  dictionaryCode="grade"
                ></form-component>
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
            <td colspan="3">
            </td>
          </tr>
          <tr>
            <th>地质情况</th>
            <td colspan="2">
              <el-form-item label="" prop="geologyCase" >
                <el-input class="form-input" v-model="formData.geologyCase" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>设计单位</th>
            <td colspan="2">
              <el-form-item label="" prop="designUnit" >
                <el-input class="form-input" v-model="formData.designUnit" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>施工单位</th>
            <td colspan="2">
              <el-form-item label="" prop="constructionUnit" >
                <el-input class="form-input" v-model="formData.constructionUnit" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>竣工日期</th>
            <td colspan="2">
              <el-form-item label="" prop="completionDate" >
                <el-date-picker class="form-input" v-model="formData.completionDate" value-format="yyyy-MM-dd" type="date" ></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>有无检测点</th>
            <td colspan="2">
              <el-form-item label="" prop="checkPoint" >
                <form-component
                  v-model="formData.checkPoint"
                  type="select"
                  dictionaryCode="haveOrNot"
                ></form-component>
              </el-form-item>
            </td>
            <th>有无检修通道</th>
            <td colspan="2">
              <el-form-item label="" prop="serviceChannel" >
                <form-component
                  v-model="formData.serviceChannel"
                  type="select"
                  dictionaryCode="haveOrNot"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>管理单位</th>
            <td colspan="2">
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>是否移交</th>
            <td colspan="2">
              <el-form-item label="" prop="isHandOver" >
                <form-component
                  v-model="formData.isHandOver"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th style="text-align: center" colspan="3">边坡</th>
            <th style="text-align: center" colspan="3">挡土墙</th>
          </tr>
          <tr>
            <th>护面形式</th>
            <td colspan="2">
              <el-form-item label="" prop="protectionType" >
                <el-input class="form-input" v-model="formData.protectionType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>结构形式</th>
            <td colspan="2">
              <el-form-item label="" prop="structureForm" >
                <el-input class="form-input" v-model="formData.structureForm" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>高度(米)</th>
            <td colspan="2">
              <el-form-item label="" prop="height" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.height" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>位置</th>
            <td colspan="2">
              <el-form-item label="" prop="positions" >
                <el-input class="form-input" v-model="formData.positions" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>位置</th>
            <td colspan="2">
              <el-form-item label="" prop="position" >
                <el-input class="form-input" v-model="formData.position" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>高度(米)</th>
            <td colspan="2">
              <el-form-item label="" prop="heights" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.heights" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>平均坡度</th>
            <td colspan="2">
              <el-form-item label="" prop="averagePitch" >
                <el-input class="form-input" v-model="formData.averagePitch" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th></th>
            <td colspan="2">
            </td>
          </tr>
          <tr>
            <th rowspan="2">坡级</th>
            <th style="text-align: center">数目</th>
            <th style="text-align: center">防护坡率（分级注明）</th>
            <th rowspan="2">泄水孔</th>
            <th style="text-align: center">大小（毫米）</th>
            <th style="text-align: center">间距（米）</th>
          </tr>
          <tr>
            <td>
              <el-form-item label="" prop="num" :rules="[$validate.Number]">
                <el-input style="width: 100%;" v-model="formData.num" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" prop="entrenchRate" >
                <el-input style="width: 100%;" v-model="formData.entrenchRate" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" prop="bigOrSmall" :rules="[$validate.PositiveNumber]">
                <el-input style="width: 100%;" v-model="formData.bigOrSmall" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="" prop="spacing" :rules="[$validate.PositiveNumber]">
                <el-input style="width: 100%;" v-model="formData.spacing" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th style="text-align: center" colspan="3">正面照(400*300)</th>
            <th style="text-align: center" colspan="3">正面照(400*300)</th>
          </tr>
          <tr>
            <td colspan="3" height="190" class="upload-td">
              <uploader v-model="formData.sideView" btnName="上传图片" accept="image/*"></uploader>
            </td>
            <td colspan="3" height="190" class="upload-td">
              <uploader v-model="formData.wallView" btnName="上传图片" accept="image/*"></uploader>
            </td>
          </tr>
          <tr>
            <th>检查记录</th>
            <td colspan="5">
              <el-form-item label="" prop="inspectionRecord">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入检查记录"
                  v-model="formData.inspectionRecord">
                </el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>监测记录</th>
            <td colspan="5">
              <el-form-item label="" prop="detectionRecord">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入监测记录"
                  v-model="formData.detectionRecord">
                </el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>维修加固记录</th>
            <td colspan="5">
              <el-form-item label="" prop="serviceRecord">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入维修加固记录"
                  v-model="formData.serviceRecord">
                </el-input>
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
              <uploader v-model="formData.sessionId"></uploader>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
import rightNavLayout from '@/components/topToolBar';
import ztreeSelect from '@/components/ztreeSelect';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import { mapGetters } from 'vuex';
import latLngPosition from '@/components/latLngPosition';
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader,
    formComponent,
    latLngPosition
  },
  data ()
  {
    return {
      style: {},
      metaData: {
        deptTreeTool: null,
        roleTreeTool: null
      }
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
            // id为空说明是新增的
            if (this.formData.id === '')
            {
            }
            else
            {
              obj = Object.assign({}, this.formData, {
                // roleIds: roleIds,
                // deptIds: deptIds
              });
            }
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_SLOPE/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_SLOPE/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_SLOPE', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'qrCodeUrl'
    ])
  },
  watch: {
    roleTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.roleTreeTool = new TreeTool('roleTree', this.roleTree, true);
          this.metaData.roleTreeTool.setCheck();
        }
      }, 20);
    },
    deptTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.deptTreeTool = new TreeTool('deptTree', this.deptTree, true);
          this.metaData.deptTreeTool.setCheck();
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
