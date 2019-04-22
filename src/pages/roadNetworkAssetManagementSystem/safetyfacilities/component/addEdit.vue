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
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="4">
              <h2 style="text-align: center">交安设施卡片</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th rowspan="5">交安图片</th>
            <td rowspan="5" class="upload-td">
              <uploader v-model="formData.picture" btnName="上传图片" accept="image/*"></uploader>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>设施名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>方向</th>
            <td>
              <el-form-item label="" prop="direction" >
                <el-input class="form-input" v-model="formData.direction" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>设施桩号</th>
            <td>
              <el-form-item label="" prop="mileageStake" :rules="[$validate.PileToPile]">
                <el-input class="form-input" v-model="formData.mileageStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>设施位置</th>
            <td>
              <el-form-item label="" prop="facilitiesLocation" >
                <el-input class="form-input" v-model="formData.facilitiesLocation" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>设施规格</th>
            <td>
              <el-form-item label="" prop="facilitiesSpecification" >
                <el-input class="form-input" v-model="formData.facilitiesSpecification" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>设施用途</th>
            <td>
              <el-form-item label="" prop="facilitiesUse" >
                <el-input class="form-input" v-model="formData.facilitiesUse" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>建立时间</th>
            <td>
              <el-form-item label="" prop="buildDate" >
                <el-date-picker class="form-input" v-model="formData.buildDate" value-format="yyyy-MM-dd" type="date" ></el-date-picker>
              </el-form-item>
            </td>
            <th>使用年限</th>
            <td>
              <el-form-item label="" prop="lifePeriod" >
                <el-input class="form-input" v-model="formData.lifePeriod" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>管理单位</th>
            <td>
              <el-form-item label="" prop="belongDeptId" :rules="[$validate.Required]">
                <ztree-select
                  v-model="formData.belongDeptId"
                  :ztreeList="ztreeSelect"
                ></ztree-select>
              </el-form-item>
            </td>
            <th>是否移交</th>
            <td>
              <el-form-item label="" prop="isHandOver" >
                <el-input class="form-input" v-model="formData.isHandOver" :readonly="readOnly"></el-input>
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
            this.$store.dispatch('roadNetworkAssetManagementSystem/_SAFETYFACILITIES/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_SAFETYFACILITIES/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_SAFETYFACILITIES', [
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
