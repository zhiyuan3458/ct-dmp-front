<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="21%"/>
            <col width="12%"/>
            <col width="22%"/>
          </colgroup>
          <!-- 沥青路面损坏调查表数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">桥隧构造物损坏调查表</h2>
            </th>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>路线编号</th>
            <td colspan="1">
              <el-form-item label="" prop="routeCode">
                <el-input class="form-input" v-model="formData.routeCode" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查方向</th>
            <td colspan="3">
              <el-form-item label="" prop="investigateDirection">
                <el-input class="form-input" v-model="formData.investigateDirection" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>调查时间</th>
            <td>
              <el-form-item label="" prop="investigateDate">
                <el-date-picker
                  v-model="formData.investigateDate"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>调查人员</th>
            <td>
              <el-form-item label="" prop="investigator">
                <el-input class="form-input" v-model="formData.investigator" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路面宽度</th>
            <td>
              <el-form-item label="" prop="width">
                <el-input class="form-input" v-model="formData.width" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th><span style="color: red;">*</span>起点桩号</th>
            <td>
              <el-form-item label="" prop="startStake">
                <el-input class="form-input" v-model="formData.startStake" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>终点桩号</th>
            <td>
              <el-form-item label="" prop="endStake">
                <el-input class="form-input" v-model="formData.endStake" :readonly="true"></el-input>
              </el-form-item>
            </td>
            <th><span style="color: red;">*</span>路段长度</th>
            <td>
              <el-form-item label="" prop="length">
                <el-input class="form-input" v-model="formData.length" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <inline-edit-table
          title="详细内容"
          relatedTableCode="BridgeTunnelDamageSub"
          :initDataInfo="bridgetunneldamageSub"
          @change="bridgeComponentChange"
          :deleteUrl="$prifix.maintenance + '/mt/tm/bridgeoftencheck/removeBridgeComponent'"
          :objectSpanMethod="expandCol"
          :readonly="true"
        ></inline-edit-table>
        <table class="form-table" width="100%">
          <colgroup>
            <col width="12%"/>
            <col width="38%"/>
            <col width="12%"/>
            <col width="38%"/>
          </colgroup>
          <tr>
            <th>评定结果：</th>
            <td>
              BCI = {{formData.bci}}
            </td>
            <th>计算公式：</th>
            <td>
              <img src="./formula.png"/>
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
import { expandRows } from '@/common/js/util';
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
        bridgetunneldamageSub: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bridgetunneldamageSub = data;
    },
    /**
     * 表单提交.
     * @author   yekuncai
     * @date     2019/3/1
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
            let bridgetunneldamageSub = JSON.stringify(this.metaData.bridgetunneldamageSub);
            Object.assign(obj, this.formData, {bridgetunneldamageSub: bridgetunneldamageSub});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGETUNNELDAMAGE/save', obj);
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
     * @author   yekuncai
     * @date     2019/3/1
     */
    returnFn ()
    {
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BRIDGETUNNELDAMAGE/showList');
    },
    // 合并列
    expandCol ({ row, column, rowIndex, columnIndex })
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
    ...mapGetters('intelligentMaintenanceManagementSystem/_BRIDGETUNNELDAMAGE', [
      'readOnly',
      'formData',
      'navigateMenus',
      'operateBtns',
      'isLoading',
      'bridgetunneldamageSub'
    ]),
    range ()
    {
      const list = JSON.parse(this.bridgetunneldamageSub);
      return expandRows(list, 'surveyContent');
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
