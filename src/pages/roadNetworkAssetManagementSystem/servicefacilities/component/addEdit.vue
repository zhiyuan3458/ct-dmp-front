停车位数量(个)
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
              <h2 style="text-align: center">公路服务设施</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路线名称</th>
            <td>
              <el-form-item label="" prop="routeName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeName" :readonly="readOnly"></el-input>
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
            <th><span style="color: red;">*</span>服务设施名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>桩号</th>
            <td>
              <el-form-item label="" prop="stake" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.stake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>服务设施类型</th>
            <td>
              <el-form-item label="" prop="type">
                <form-component
                  v-model="formData.type"
                  type="select"
                  dictionaryCode="facilitiesType"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>初始运营时间</th>
            <td>
              <el-form-item label="" prop="operateTime">
                <el-date-picker v-model="formData.operateTime"
                  type="date"
                  placeholder="选择日期" :readonly="readOnly" >
                </el-date-picker>
              </el-form-item>
            </td>
            <th>布局形式</th>
            <td>
              <el-form-item label="" prop="layoutForm">
                <form-component
                  v-model="formData.layoutForm"
                  type="select"
                  dictionaryCode="layoutForm"
                ></form-component>
              </el-form-item>
            </td>
            <th>经营模式</th>
            <td>
              <el-form-item label="" prop="operateModel">
                  <form-component
                    v-model="formData.operateModel"
                    type="select"
                    dictionaryCode="managementModel"
                  ></form-component>
                </el-form-item>
            </td>
          </tr>
          <tr>
            <th>占地面积(平方米)</th>
            <td>
              <el-form-item label="" prop="area" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.area" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>停车场面积(平方米)</th>
            <td>
              <el-form-item label="" prop="parkingArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.parkingArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>停车位数量(个)</th>
            <td>
              <el-form-item label="" prop="parkingSpacesNumber" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.parkingSpacesNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>是否有厕所</th>
            <td>
              <el-form-item label="" prop="isToilet">
                <form-component
                  v-model="formData.isToilet"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th>是否有加油设施</th>
            <td>
              <el-form-item label="" prop="isRefueling">
                <form-component
                  v-model="formData.isRefueling"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th>是否有加气设施</th>
            <td>
              <el-form-item label="" prop="isGas">
                <form-component
                  v-model="formData.isGas"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>是否有车辆充电设施</th>
            <td>
              <el-form-item label="" prop="isVehicleCharging">
                <form-component
                  v-model="formData.isVehicleCharging"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th>是否有餐饮设施</th>
            <td>
              <el-form-item label="" prop="isCatering">
                <form-component
                  v-model="formData.isCatering"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th>是否有超市</th>
            <td>
              <el-form-item label="" prop="isSupermarket">
                <form-component
                  v-model="formData.isSupermarket"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>是否有住宿设施</th>
            <td>
              <el-form-item label="" prop="isAccommodated">
                <form-component
                  v-model="formData.isAccommodated"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th>是否有汽车维修</th>
            <td>
              <el-form-item label="" prop="isCarRepaired">
                <form-component
                  v-model="formData.isCarRepaired"
                  type="select"
                  dictionaryCode="yesNo"
                ></form-component>
              </el-form-item>
            </td>
            <th></th>
            <td>
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
                // belongDeptIds: belongDeptIds
              });
            }
            this.loading = true;
            this.$store.dispatch('roadNetworkAssetManagementSystem/_SERVICEFACILITIES/save', obj);
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
      this.$store.dispatch('roadNetworkAssetManagementSystem/_SERVICEFACILITIES/showList', this.belongDeptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_SERVICEFACILITIES', [
      'readOnly',
      'formData',
      'belongDeptId',
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
