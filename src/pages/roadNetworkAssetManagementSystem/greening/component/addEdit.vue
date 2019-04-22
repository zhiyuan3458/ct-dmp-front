<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <input v-show="false" v-model="formData.belongDeptId">
          <colgroup>
            <col width="20%"/>
            <col width="30%"/>
            <col width="20%"/>
            <col width="30%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="4">
              <h2 style="text-align: center">绿化基本信息</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>绿化路段编号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>登记日期</th>
            <td>
              <el-form-item label="" prop="registrationDate" :rules="[$validate.Required]">
                <el-date-picker
                  v-model="formData.registrationDate"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
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
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>乔木(株)</th>
            <td>
              <el-form-item label="" prop="trees" :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.trees" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>绿化总面积(M2)</th>
            <td>
              <el-form-item label="" prop="totalArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.totalArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>花灌(株)</th>
            <td>
              <el-form-item label="" prop="shrubs" :rules="[$validate.Number]">
                <el-input class="form-input" v-model="formData.shrubs" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>中分带绿化面积(M2)</th>
            <td>
              <el-form-item label="" prop="zoningArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.zoningArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>绿篱(米)</th>
            <td>
              <el-form-item label="" prop="hedge" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.hedge" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>侧分带绿化面积(M2)</th>
            <td>
              <el-form-item label="" prop="lateralZonationArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.lateralZonationArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>草坪(M2)</th>
            <td>
              <el-form-item label="" prop="lawn" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.lawn" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>人行道绿化面积(M2)</th>
            <td>
              <el-form-item label="" prop="sidewalkArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.sidewalkArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>其他地被(M2)</th>
            <td>
              <el-form-item label="" prop="otherVegetation" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.otherVegetation" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>两侧绿地面积(M2)</th>
            <td>
              <el-form-item label="" prop="bothsideSpaceArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.bothsideSpaceArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>绿化率(%)</th>
            <td>
              <el-form-item label="" prop="afforestationRate" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.afforestationRate" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>上边坡绿化面积(M2)</th>
            <td>
              <el-form-item label="" prop="onSlopeArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.onSlopeArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>覆盖率(%)</th>
            <td>
              <el-form-item label="" prop="coverageRate" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.coverageRate" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>下边坡绿化面积(M2)</th>
            <td>
              <el-form-item label="" prop="underSlopeArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.underSlopeArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>路段编号</th>
            <td>
              <el-form-item label="" prop="sectionCode" >
                <el-input class="form-input" v-model="formData.sectionCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>经度</th>
            <td>
              <el-form-item label="" prop="longitude" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.longitude" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>纬度</th>
            <td>
              <el-form-item label="" prop="latitude" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.latitude" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>可绿化里程(KM)</th>
            <td>
              <el-form-item label="" prop="greeningMileage" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.greeningMileage" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="2">
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
export default {
  components: {
    rightNavLayout,
    ztreeSelect,
    uploader,
    formComponent
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
            this.$store.dispatch('roadNetworkAssetManagementSystem/_GREENING/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_GREENING/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_GREENING', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns'
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
