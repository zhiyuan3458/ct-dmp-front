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
          <input v-show="false" v-model="formData.belongDeptId">
          <colgroup>
            <col width="8%"/>
            <col width="12%"/>
            <col width="30%"/>
            <col width="8%"/>
            <col width="12%"/>
            <col width="30%"/>
          </colgroup>
          <!-- A数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">公路用地基本信息</h2>
            </th>
          </tr>
          <tr>
            <th colspan="2"><span style="color: red;">*</span>资产编号</th>
            <td>
              <el-form-item label="" prop="code" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.code" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">资产分类名称</th>
            <td>
              <el-form-item label="" prop="type">
                <el-input class="form-input" v-model="formData.type" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2"><span style="color: red;">*</span>资产名称</th>
            <td>
              <el-form-item label="" prop="name" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.name" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">预算项目编号</th>
            <td>
              <el-form-item label="" prop="projectCode">
                <el-input class="form-input" v-model="formData.projectCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">使用状态</th>
            <td>
              <el-form-item label="" prop="status">
                <el-input class="form-input" v-model="formData.status" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">使用权面积（㎡）</th>
            <td>
              <el-form-item label="" prop="usageArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.usageArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">独用面积（㎡）</th>
            <td>
              <el-form-item label="" prop="exclusiveArea" :rules="[$validate.PositiveNumber]">
                <el-input class="form-input" v-model="formData.exclusiveArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">取得方式</th>
            <td>
              <el-form-item label="" prop="getWay">
                <el-input class="form-input" v-model="formData.getWay" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">产权取得日期</th>
            <td>
              <el-form-item label="" prop="getDate">
                <el-date-picker
                  v-model="formData.getDate"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
            <th colspan="2">投入使用日期</th>
            <td>
              <el-form-item label="" prop="usageDate">
                <el-date-picker
                  v-model="formData.usageDate"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">价值类型</th>
            <td>
              <el-form-item label="" prop="valueType">
                <el-input class="form-input" v-model="formData.valueType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">价值（元）</th>
            <td>
              <el-form-item label="" prop="value">
                <el-input class="form-input" v-model="formData.value" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">均价</th>
            <td>
              <el-form-item label="" prop="averagePrice">
                <el-input class="form-input" v-model="formData.averagePrice" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th rowspan="2">经费<br>来源</th>
            <th>财政性资金（元）</th>
            <td>
              <el-form-item label="" prop="financialFunds">
                <el-input class="form-input" v-model="formData.financialFunds" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">入账形式</th>
            <td>
              <el-form-item label="" prop="entryForm">
                <el-input class="form-input" v-model="formData.entryForm" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>非财政性资金（元）</th>
            <td>
              <el-form-item label="" prop="nonFinancialFunds">
                <el-input class="form-input" v-model="formData.nonFinancialFunds" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">财务入账日期</th>
            <td>
              <el-form-item label="" prop="entryDate">
                <el-date-picker
                  v-model="formData.entryDate"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
            <th colspan="2">会计凭证号</th>
            <td>
              <el-form-item label="" prop="accountNumber">
                <el-input class="form-input" v-model="formData.accountNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">产权形式</th>
            <td>
              <el-form-item label="" prop="propertyForm">
                <el-input class="form-input" v-model="formData.propertyForm" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">权属证明</th>
            <td>
              <el-form-item label="" prop="propertyProve" >
                <el-input class="form-input" v-model="formData.propertyProve" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">权属性质(*)</th>
            <td>
              <el-form-item label="" prop="propertyNature">
                <el-input class="form-input" v-model="formData.propertyNature" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">权属年限（月）</th>
            <td>
              <el-form-item label="" prop="propertyPeriod">
                <el-input class="form-input" v-model="formData.propertyPeriod" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">权属证号</th>
            <td>
              <el-form-item label="" prop="propertyNumber">
                <el-input class="form-input" v-model="formData.propertyNumber" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">使用权类型</th>
            <td>
              <el-form-item label="" prop="rightType">
                <el-input class="form-input" v-model="formData.rightType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">发证日期</th>
            <td>
              <el-form-item label="" prop="certificateDate">
                <el-date-picker
                  v-model="formData.certificateDate"
                  value-format="yyyy-MM-dd"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </td>
            <th colspan="2">分摊面积（㎡）</th>
            <td>
              <el-form-item label="" prop="apportionArea">
                <el-input class="form-input" v-model="formData.apportionArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">地类（用途）</th>
            <td>
              <el-form-item label="" prop="landType">
                <el-input class="form-input" v-model="formData.landType" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">土地级次</th>
            <td>
              <el-form-item label="" prop="landLevel">
                <el-input class="form-input" v-model="formData.landLevel" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">使用人</th>
            <td>
              <el-form-item label="" prop="user">
                <el-input class="form-input" v-model="formData.user" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">折旧状态</th>
            <td>
              <el-form-item label="" prop="depreciation">
                <el-input class="form-input" v-model="formData.depreciation" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">净值</th>
            <td>
              <el-form-item label="" prop="netWorth">
                <el-input class="form-input" v-model="formData.netWorth" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">坐落位置</th>
            <td>
              <el-form-item label="" prop="location">
                <el-input class="form-input" v-model="formData.location" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th colspan="2">自用面积（㎡）</th>
            <td>
              <el-form-item label="" prop="selfArea">
                <el-input class="form-input" v-model="formData.selfArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">自用价值（元）</th>
            <td>
              <el-form-item label="" prop="selfValue">
                <el-input class="form-input" v-model="formData.selfValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th rowspan="4">使用<br>方向<br>及面<br>积</th>
            <th>出借面积（㎡）</th>
            <td>
              <el-form-item label="" prop="lendingArea">
                <el-input class="form-input" v-model="formData.lendingArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">出借价值（元）</th>
            <td>
              <el-form-item label="" prop="lendingValue">
                <el-input class="form-input" v-model="formData.lendingValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>出租面积（㎡）</th>
            <td>
              <el-form-item label="" prop="rentalArea">
                <el-input class="form-input" v-model="formData.rentalArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">出租价值（元）</th>
            <td>
              <el-form-item label="" prop="rentalValue">
                <el-input class="form-input" v-model="formData.rentalValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>对外投资面积（㎡）</th>
            <td>
              <el-form-item label="" prop="investArea">
                <el-input class="form-input" v-model="formData.investArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">对外投资价值（元）</th>
            <td>
              <el-form-item label="" prop="investValue">
                <el-input class="form-input" v-model="formData.investValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>其他面积（㎡）</th>
            <td>
              <el-form-item label="" prop="otherArea">
                <el-input class="form-input" v-model="formData.otherArea" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th colspan="2">其他价值（元）</th>
            <td>
              <el-form-item label="" prop="otherValue">
                <el-input class="form-input" v-model="formData.otherValue" :readonly="readOnly"></el-input>
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
     * @author   liangyi
     * @date     2018/12/25
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
            this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADLAND/save', obj);
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
     * @author   liangyi
     * @date     2018/12/25
     */
    returnFn ()
    {
      this.$store.dispatch('roadNetworkAssetManagementSystem/_ROADLAND/showList', this.deptId);
    }
  },
  computed: {
    ...mapGetters('roadNetworkAssetManagementSystem/_ROADLAND', [
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
