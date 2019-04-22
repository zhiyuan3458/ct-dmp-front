<template>
  <div class="lzy-form-wrapper">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
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
          <!-- 沥青路面损坏调查表数据 -->
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">沥青路面损坏调查表</h2>
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
              <el-form-item label="" prop="investigateDirection" :rules="[$validate.Pile]">
                <el-input class="form-input" v-model="formData.investigateDirection" :readonly="true"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <th>调查时间</th>
            <td>
              <el-form-item label="" prop="investigateTime">
                <el-input class="form-input" v-model="formData.investigateTime" :readonly="true"></el-input>
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
          relatedTableCode="BitumenRoadDamageSub"
          :initDataInfo="bitumenRoadDamageSub"
          @change="bridgeComponentChange"
          :deleteUrl="$prifix.maintenance + '/mt/ta/bridgeoftencheck/removeBridgeComponent'"
          :objectSpanMethod="expandCol"
          :readonly="true"
        ></inline-edit-table>
        <table class="form-table" width="100%">
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
        bitumenRoadDamageSub: []
      }
    };
  },
  methods: {
    bridgeComponentChange (data)
    {
      this.metaData.bitumenRoadDamageSub = data;
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
            let bitumenRoadDamageSub = JSON.stringify(this.metaData.bitumenRoadDamageSub);
            Object.assign(obj, this.formData, {bitumenRoadDamageSub: bitumenRoadDamageSub});
            this.loading = true;
            this.$store.dispatch('intelligentMaintenanceManagementSystem/_BITUMENROADDAMAGE/save', obj);
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
      this.$store.dispatch('intelligentMaintenanceManagementSystem/_BITUMENROADDAMAGE/showList', this.deptId);
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
    ...mapGetters('intelligentMaintenanceManagementSystem/_BITUMENROADDAMAGE', [
      'readOnly',
      'formData',
      'deptId',
      'ztreeSelect',
      'navigateMenus',
      'operateBtns',
      'bitumenRoadDamageSub'
    ]),
    range ()
    {
      const list = JSON.parse(this.bitumenRoadDamageSub);
      return expandRows(list, 'name');
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
</style>
