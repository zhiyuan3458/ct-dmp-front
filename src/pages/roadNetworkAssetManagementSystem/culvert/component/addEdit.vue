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
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">涵洞卡片</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>涵洞编号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>涵洞名称</th>
            <td>
              <el-form-item label="" prop="name">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>技术状况</th>
            <td>
              <el-form-item label="" prop="techGrade">
                <el-input class="form-input" v-model="formData.techGrade" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>设计荷载</th>
            <td>
              <el-form-item label="" prop="designLoad">
                <el-input class="form-input" v-model="formData.designLoad" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>里程桩号</th>
            <td>
              <el-form-item label="" prop="mileageStake" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.mileageStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>材料类型</th>
            <td>
              <el-form-item label="" prop="materialType">
                <el-input class="form-input" v-model="formData.materialType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>涵底坡度</th>
            <td>
              <el-form-item label="" prop="culvertBottomScope">
                <el-input class="form-input" v-model="formData.culvertBottomScope" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>孔数(个)</th>
            <td>
              <el-form-item label="" prop="holeNumber" :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.holeNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>孔径(m)</th>
            <td>
              <el-form-item label="" prop="aperture" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.aperture" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>涵长(m)</th>
            <td>
              <el-form-item label="" prop="length" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.length" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>填土高(m)</th>
            <td>
              <el-form-item label="" prop="fillHeight" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.fillHeight" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>净高(m)</th>
            <td>
              <el-form-item label="" prop="clearHeight" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.clearHeight" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>用途分类</th>
            <td>
              <el-form-item label="" prop="useClassification">
                <el-input class="form-input" v-model="formData.useClassification" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>进口宽度(m)</th>
            <td>
              <el-form-item label="" prop="entranceWidth" :readonly="readOnly" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.entranceWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>进口高度(m)</th>
            <td>
              <el-form-item label="" prop="entranceHeight" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.entranceHeight" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>进口形式</th>
            <td>
              <el-form-item label="" prop="entranceForm">
                <el-input class="form-input" v-model="formData.entranceForm" :readonly="readOnly" ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>出口宽度(m)</th>
            <td>
              <el-form-item label="" prop="exitWidth" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.exitWidth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>出口高度(m)</th>
            <td>
              <el-form-item label="" prop="exitHeight" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.exitHeight" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>出口形式</th>
            <td>
              <el-form-item label="" prop="exitForm">
                <el-input class="form-input" v-model="formData.exitForm" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>使用情况</th>
            <td>
              <el-form-item label="" prop="useCase">
                <el-input class="form-input" v-model="formData.useCase" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>墙/拱圈盖板或管厚(米)</th>
            <td>
              <el-form-item label="" prop="plateThick" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.plateThick" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>护底材料与面积</th>
            <td>
              <el-form-item label="" prop="bottomArea">
                <el-input class="form-input" v-model="formData.bottomArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>基础种类及厚度(米)</th>
            <td>
              <el-form-item label="" prop="basicThick" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.basicThick" :readonly="readOnly"></el-input>
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
                  dictionaryCode="yesNo"
                ></form-component>
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
            this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_CULVERT/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_CULVERT', [
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
