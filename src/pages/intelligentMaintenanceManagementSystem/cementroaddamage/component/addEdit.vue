<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
            <col width="12.5%"/>
          </colgroup>
          <!-- 头部 -->
          <tr>
            <th class="form-header" colspan="8">
              <h2 style="text-align: center">水泥混凝土路面损坏调查表</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号: </th>
            <td>
              <el-form-item label="" prop="routeCode" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查方向:</th>
            <td>
              <el-form-item label="" prop="investigateDirection" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.investigateDirection" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查时间:</th>
            <td>
              <el-form-item label="" prop="investigateTime">
                <el-date-picker
                  v-model="formData.investigateTime"
                  value-format="yyyy-MM-dd"
                  type="date" :readonly="readOnly">
                </el-date-picker>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查人员:</th>
            <td>
              <el-form-item label="" prop="investigator" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.investigator" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>起点桩号:</th>
            <td>
              <el-form-item label="" prop="startStake" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.startStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>终点桩号:</th>
            <td>
              <el-form-item label="" prop="endStake" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.endStake" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路段长度: </th>
            <td>
              <el-form-item label="" prop="length" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.length" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路面宽度: </th>
            <td>
              <el-form-item label="" prop="width" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.width" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="10%"/>
            <col width="10%"/>
            <col width="20%"/>
            <col width="10%"/>
            <col width="20%"/>
            <col width="10%"/>
            <col width="20%"/>
          </colgroup>
        </table>
        <!-- 子表数据 -->
        <inline-edit-table
          title=""
          relatedTableCode="cementRoadDamageSub"
          :initDataInfo="listCementRoadDamageSub"
          :readonly="readOnly"
          @change="cementRoadDamageSubChange"
          :deleteUrl="$prifix.maintenance + '/mt/ta/cementroaddamage/removeCementRoadDamage'"
          :objectSpanMethod="objectSpanMethod"
        ></inline-edit-table>
        <!--底部-->
        <table class="form-table" width="100%">
          <tr>
            <th>DR</th>
            <td>
              <el-form-item label="" prop="importedDrValue">
                <el-input class="form-input" v-model="formData.importedDrValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
            <th>PIC</th>
            <td>
              <el-form-item label="" prop="importedPciValue">
                <el-input class="form-input" v-model="formData.importedPciValue" :readonly="readOnly"></el-input>
              </el-form-item>
            </td>
          </tr>
          <th>计算公式：</th>
          <td>
            <img src="./method.jpg"/>
          </td>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import uploader from '@/components/uploader';
import formComponent from '@/components/formComponent';
import inlineEditTable from '@/components/inline-edit-table';
import { expandRows } from '@/common/js/util';
export default {
  components: {
    rightNavLayout,
    uploader,
    formComponent,
    inlineEditTable
  },
  data ()
  {
    return {
      metaData: {
        cementRoadDamageSub: [],
        loading: false
      },
      toolShow: true,
      arr: []
    };
  },

  methods: {
    /**
       *保存信息
       * @author   gongjuncheng
       * @date     2019/1/8
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
            let cementRoadDamageSubString = JSON.stringify(this.metaData.cementRoadDamageSub);
            Object.assign(obj, this.formData, {cementRoadDamageSub: cementRoadDamageSubString});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_CEMENTROADDAMAGE/save', obj);
          }
          else
          {
            this.$message('数据填写格式有误!');
            return false;
          }
        });
      });
    },
    /**
       * 隧道定期检查子表数据赋值
       * @author   gongjuncheng
       * @date     2019/1/7
       */
    cementRoadDamageSubChange (data)
    {
      this.metaData.cementRoadDamageSub = data;
    },
    /**
       *返回
       * @author   gongjuncheng
       * @date     2019/1/3
       */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_CEMENTROADDAMAGE/showList', this.systemId);
    },
    /**
     *合并行方法
     * @author   gongjuncheng
     * @date     2019/1/3
     */
    objectSpanMethod ({ row, column, rowIndex, columnIndex })
    {
      if (columnIndex === 0 || columnIndex === 3)
      {
        const _row = this.range[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return [_row, _col];
      }
    }
  },
  computed: {
    ...mapGetters('intelligentMaintenanceManagementSystem/_CEMENTROADDAMAGE', [
      'readOnly',
      'systemId',
      'formData',
      'isAddEditShow',
      'menuPages',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'listCementRoadDamageSub'
    ]),
    range ()
    {
      const list = JSON.parse(this.listCementRoadDamageSub);
      return expandRows(list, 'investigateContent');
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../../../common/less/common';
</style>
